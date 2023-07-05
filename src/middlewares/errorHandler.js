const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  return res.status(statusCode).json({
    statusCode: statusCode,
    message: err.message,
  });
};

export default errorHandler;
