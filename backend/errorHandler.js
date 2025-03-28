export class ApiError extends Error {
    constructor(statusCode, message, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Internal Server Error';
    
    if (process.env.NODE_ENV === 'development') {
      console.error(err.stack);
    }
  
    res.status(statusCode).json({
      success: false,
      error: message
    });
  };
  
  export const notFound = (req, res, next) => {
    next(new ApiError(404, `Not found - ${req.originalUrl}`));
  };
  