module.exports.sendErrorMessage = (err, res) => {
  if (err.name === 'ValidationError') return res.status(400).send({message: 'Не правильно введены данные'});
  return res.status(500).send({message: `Внутренняя ошибка сервера`});
}








