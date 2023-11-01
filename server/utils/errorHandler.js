const errorHandler = (code, message) => {
  const error = new Error();
  error.code = code;
  error.message = message;
  return error;
};

module.exports = errorHandler;