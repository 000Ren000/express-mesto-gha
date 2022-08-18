const jwt = require('jsonwebtoken');
const config = require('config');

const ERROR_CODE_400 = 400;
const TOKEN_ERROR_401 = 401;
const NOTFOUND_ERROR_404 = 404;
const DATACHANGE_EROR_409 = 409;
const SERVER_ERROR_500 = 500;

module.exports = {
  ERROR_CODE_400,
  TOKEN_ERROR_401,
  NOTFOUND_ERROR_404,
  SERVER_ERROR_500,
  DATACHANGE_EROR_409,
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
      .status(NOTFOUND_ERROR_404)
      .send({ message: 'Запрашиваемые данные не найдены' });
  }
  if (err.name === 'ValidationError' || err.name === 'Validation failed') {
    return res
      .status(ERROR_CODE_400)
      .send({ message: 'Не правильно введены данные' });
  }
  return res
    .status(SERVER_ERROR_500)
    .send({ message: 'Внутренняя ошибка сервера' });
};
