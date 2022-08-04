module.exports.sendErrorMessage = (err, res) => {
  if (err.name === 'CastError')
    return res.status(404).send({message: 'Запрашиваемая карточка не найдена'});
  if (err.name === 'ValidationError')
    return res.status(400).send({message: 'Не правильно введены данные'});
  return res.status(500).send({message: `Внутренняя ошибка сервера`});
}








