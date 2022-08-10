const ERROR_CODE = 400;
const NOTFOUND_ERROR = 404;
const SERVER_ERROR = 500;

module.exports = {
  ERROR_CODE,
  NOTFOUND_ERROR,
  SERVER_ERROR,
};

module.exports.sendErrorMessage = (err, res) => {
  if (err.name === 'CastError') {
    return res
      .status(NOTFOUND_ERROR)
      .send({ message: 'Запрашиваемые данные не найдены' });
  }
  if (err.name === 'ValidationError' || err.name === 'Validation failed') {
    return res
      .status(ERROR_CODE)
      .send({ message: 'Не правильно введены данные' });
  }
  return res
    .status(SERVER_ERROR)
    .send({ message: 'Внутренняя ошибка сервера' });
};
