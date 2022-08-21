const jwt = require('jsonwebtoken');
const config = require('config');
const { Error } = require('mongoose');

// const ErrorCode = 400;
// const TOKEN_ERROR_401 = 401;
// const NotFoundError = 404;
// const DataChangeError = 409;
// const SERVER_ERROR_500 = 500;

class ErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class TOKEN_ERROR_401 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class DataChangeError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class SERVER_ERROR_500 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  ErrorCode,
  TOKEN_ERROR_401,
  NotFoundError,
  SERVER_ERROR_500,
  DataChangeError,
};

module.exports.createJWT = (_id) => {
  const token = jwt.sign(
    { _id },
    config.get('jwtSecret'),
    { expiresIn: '7d' },
  );
  return token;
};

module.exports.sendErrorMessage = (err, res) => {
  if (err.name === 'CastError') {
    return res
      .status(NotFoundError)
      .send({ message: 'Запрашиваемые данные не найдены' });
  }
  if (err.name === 'ValidationError' || err.name === 'Validation failed') {
    return res
      .status(ErrorCode)
      .send({ message: 'Не правильно введены данные' });
  }
  return res
    .status(SERVER_ERROR_500)
    .send({ message: 'Внутренняя ошибка сервера' });
};
