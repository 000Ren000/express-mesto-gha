const jwt = require('jsonwebtoken');
const config = require('config');
const validator = require('validator');
const DataChangeError = require('./Errors/DataChangeError');
const ErrorCode = require('./Errors/ErrorCode');
const NotFoundError = require('./Errors/NotFoundError');
const ServerError = require('./Errors/ServerError');

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
    .status(ServerError)
    .send({ message: 'Внутренняя ошибка сервера' });
};
