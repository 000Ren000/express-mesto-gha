const Card = require('../models/card');
const {sendErrorMessage, NOTFOUND_ERROR} = require('../utils/utils')

const cardVerification = async (req, res) => {
  if (!await Card.exists({_id: req.params.cardId})) {
    res.status(NOTFOUND_ERROR).send({message: "Карточка не найдена"});
    return true;
  }
  else  return false;
}

//Методы работы с карточками

// GET /cards — возвращает все карточки
module.exports.getCardAll = async (req, res) => {
  try {
    const allCard = await Card.find({});
    await res.send(200, allCard);
  } catch (err) {
    sendErrorMessage(err, res)
  }
}

// POST /cards — создаёт карточку
module.exports.createCard = async (req, res) => {
  try {
    const {name, link} = req.body;
    const newCard = await Card.create({name, link, owner: req.user._id});
    await res.send(201, newCard);
  } catch (err) {
    sendErrorMessage(err, res)
  }
}

// DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCard = async (req, res) => {
  try {
    if (await cardVerification(req, res)) return;
    await Card.deleteOne({_id: req.params.cardId});
    await res.send(200, {message: "Карточка удалена!"})
  } catch (err) {
    sendErrorMessage(err, res)
  }
}

module.exports.likeCard = async (req, res) => {
  try {
    if (await cardVerification(req, res)) return;
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      {$addToSet: {likes: req.user._id}}, // добавить _id в массив, если его там нет
      {new: true},
    )
    await res.send(200, newCard);
  } catch (err) {
    sendErrorMessage(err, res)
  }
}

module.exports.dislikeCard = async (req, res) => {
  try {
    if (await cardVerification(req, res)) return;
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      {$pull: {likes: req.user._id}},
      {new: true}
    );
    await res.send(200, newCard);
  } catch (err) {
    sendErrorMessage(err, res)
  }
}