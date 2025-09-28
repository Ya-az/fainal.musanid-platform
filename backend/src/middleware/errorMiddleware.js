// وسيط للتعامل مع خطأ 404
const notFoundMiddleware = (req, res, next) => {
  const error = new Error(`غير موجود - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// وسيط للتعامل مع الأخطاء العامة
const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = {
  notFoundMiddleware,
  errorHandlerMiddleware
};