import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from './emailService.js';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8,
    select: false
  },
  role: { 
    type: String, 
    enum: ['user', 'manager', 'admin'], 
    default: 'user' 
  },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  loginAttempts: { type: Number, default: 0 },
  accountLockedUntil: Date
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function(next) {
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
UserSchema.methods.generateVerificationToken = function() {
  const token = crypto.randomBytes(20).toString('hex');
  this.verificationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.verificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return token;
};

// Generate password reset token
UserSchema.methods.generateResetToken = function() {
  const token = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  
  return token;
};

export const User = mongoose.model('User', UserSchema);

// Authentication Service Methods
export const authService = {
  async registerUser(userData) {
    const { name, email, password, role } = userData;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User({ name, email, password, role });
    const verificationToken = user.generateVerificationToken();
    await user.save();

    // Send verification email
    await sendEmail({
      email: user.email,
      subject: 'Account Verification',
      template: 'verification',
      context: {
        name: user.name,
        verificationUrl: `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`
      }
    });

    return { 
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  },

  async loginUser(email, password, ipAddress) {
    const user = await User.findOne({ email }).select('+password +loginAttempts +accountLockedUntil');
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if account is locked
    if (user.accountLockedUntil && user.accountLockedUntil > Date.now()) {
      throw new Error(`Account locked until ${user.accountLockedUntil}`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.loginAttempts += 1;
      
      // Lock account after 5 failed attempts
      if (user.loginAttempts >= 5) {
        user.accountLockedUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
      }
      
      await user.save();
      throw new Error('Invalid credentials');
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

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    };
  },

  async verifyEmail(token) {
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationExpire: { $gt: Date.now() }
    });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpire = undefined;
    await user.save();
  },

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) return; // Don't reveal if user doesn't exist

    const resetToken = user.generateResetToken();
    await user.save();

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      template: 'password-reset',
      context: {
        name: user.name,
        resetUrl: `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
      }
    });
  },

  async resetPassword(token, newPassword) {
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
  },

  async refreshToken(oldToken) {
    try {
      const decoded = jwt.verify(oldToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      const newToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      return { token: newToken };
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
};