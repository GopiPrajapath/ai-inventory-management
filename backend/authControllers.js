import { authService } from './authService.js';
import { ApiError } from './errorHandler.js';

export const authControllers = {
  async register(req, res, next) {
    try {
      const user = await authService.registerUser(req.body);
      res.status(201).json({
        success: true,
        data: user,
        message: 'Registration successful. Please check your email to verify your account.'
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { token, user } = await authService.loginUser(email, password, req.ip);
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1 hour
      });
      
      res.json({
        success: true,
        data: { token, user }
      });
    } catch (err) {
      next(err);
    }
  },

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.params;
      await authService.verifyEmail(token);
      res.json({
        success: true,
        message: 'Email verified successfully'
      });
    } catch (err) {
      next(err);
    }
  },

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      res.json({
        success: true,
        message: 'Password reset email sent if account exists'
      });
    } catch (err) {
      next(err);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { token } = req.params;
      const { password } = req.body;
      await authService.resetPassword(token, password);
      res.json({
        success: true,
        message: 'Password reset successful'
      });
    } catch (err) {
      next(err);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      if (!token) throw new ApiError(401, 'No token provided');
      
      const { token: newToken } = await authService.refreshToken(token);
      
      res.cookie('token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1 hour
      });
      
      res.json({
        success: true,
        data: { token: newToken }
      });
    } catch (err) {
      next(err);
    }
  },

  async logout(req, res) {
    res.clearCookie('token');
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  }
};