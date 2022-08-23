// eslint-disable-next-line max-classes-per-file
const jwt = require('jsonwebtoken');
const config = require('config');
const { Error } = require('mongoose');
const validator = require('validator');

class ErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class TokenError extends Error {
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
  TokenError,
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
module.exports.validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new ErrorCode('Неправильный формат ссылки');
  }
  return value;
};
module.exports.checkValidation = (err, next) => {
  if (err.name === 'CastError') {
    throw new NotFoundError('Запрашиваемые данные не найдены');
  } else if (err.code === 11000) {
    next(new DataChangeError('Не правильно переданы данные'));
  } else if (err.name === 'ValidationError') {
    next(new ErrorCode('Не правильно переданы данные'));
  } else next(err);
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
