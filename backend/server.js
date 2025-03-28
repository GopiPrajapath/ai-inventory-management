import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import path from 'path';
import { fileURLToPath } from 'url';


// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    retryWrites: true,
    w: 'majority',
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'manager', 'admin'],
      default: 'user',
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    lastLogin: Date,
    loginAttempts: { type: Number, default: 0 },
    accountLockedUntil: Date,
  },
  { timestamps: true }
);

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Generate verification token
UserSchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.verificationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.verificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return token;
};

// Generate password reset token
UserSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

  return token;
};

const User = mongoose.model('User', UserSchema);

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Authentication Controllers
const authControllers = {
  async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = new User({ name, email, password, role });
      const verificationToken = user.generateVerificationToken();
      await user.save();

      // Send verification email
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: user.email,
        subject: 'Account Verification',
        html: `
          <p>Please verify your email by clicking the link below:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
          <p>This link will expire in 24 hours.</p>
        `,
      });

      res.status(201).json({
        success: true,
        message: 'Registration successful. Please check your email to verify your account.',
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password +loginAttempts +accountLockedUntil');

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check if account is locked
      if (user.accountLockedUntil && user.accountLockedUntil > Date.now()) {
        return res.status(403).json({
          error: `Account locked until ${new Date(user.accountLockedUntil).toLocaleString()}`,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        user.loginAttempts += 1;

        // Lock account after 5 failed attempts
        if (user.loginAttempts >= 5) {
          user.accountLockedUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
        }

        await user.save();
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Reset login attempts on successful login
      user.loginAttempts = 0;
      user.accountLockedUntil = null;
      user.lastLogin = Date.now();
      await user.save();

      // Generate JWT
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.params;
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      const user = await User.findOne({
        verificationToken: hashedToken,
        verificationExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationExpire = undefined;
      await user.save();

      res.json({
        success: true,
        message: 'Email verified successfully',
      });
    } catch (err) {
      next(err);
    }
  },

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        // Don't reveal if user doesn't exist
        return res.json({
          success: true,
          message: 'If an account exists with this email, a reset link has been sent',
        });
      }

      const resetToken = user.generateResetToken();
      await user.save();

      // Send password reset email
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: user.email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset. Click the link below:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 15 minutes.</p>
        `,
      });

      res.json({
        success: true,
        message: 'Password reset email sent if account exists',
      });
    } catch (err) {
      next(err);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.json({
        success: true,
        message: 'Password reset successful',
      });
    } catch (err) {
      next(err);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      // Set new cookie
      res.cookie('token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      res.json({
        success: true,
        data: { token: newToken },
      });
    } catch (err) {
      next(err);
    }
  },

  async logout(req, res) {
    res.clearCookie('token');
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  },
};

// Error Handling
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';

  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

const notFound = (req, res, next) => {
  next(new ApiError(404, `Not found - ${req.originalUrl}`));
};

// Routes
app.post('/api/auth/register', authControllers.register);
app.post('/api/auth/login', authControllers.login);
app.get('/api/auth/verify-email/:token', authControllers.verifyEmail);
app.post('/api/auth/forgot-password', authControllers.forgotPassword);
app.post('/api/auth/reset-password/:token', authControllers.resetPassword);
app.post('/api/auth/refresh-token', authControllers.refreshToken);
app.post('/api/auth/logout', authControllers.logout);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Test email endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email from your server',
    });
    res.json({ success: true, message: 'Test email sent successfully' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// 404 Handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});