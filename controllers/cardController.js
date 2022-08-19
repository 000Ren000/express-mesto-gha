const Card = require('../models/card');
const { sendErrorMessage, NOTFOUND_ERROR_404, DATACHANGE_EROR_409 } = require('../utils/utils');

const cardVerification = async (req, res) => {
  if (!(await Card.exists({ _id: req.params.cardId }))) {
    res.status(NOTFOUND_ERROR_404).send({ message: 'Карточка не найдена' });
    return true;
  }
  return false;
};

// GET /cards — возвращает все карточки
module.exports.getCardAll = async (req, res) => {
  try {
    const allCard = await Card.find({});
    await res.send(allCard);
  } catch (err) {
    sendErrorMessage(err, res);
  }
};

// POST /cards — создаёт карточку
module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user._id });
    await res.status(201).send(newCard);
  } catch (err) {
    sendErrorMessage(err, res);
  }
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCard = async (req, res) => {
  try {
    if (await cardVerification(req, res)) return;
    const userId = req.user._id;
    const { cardId } = req.params;
    // eslint-disable-next-line consistent-return
    const desiredCard = await Card.findById(cardId);
    if (desiredCard.owner.toString() !== userId) {
      res.status(DATACHANGE_EROR_409)
        .send({ message: 'Нет прав на удоление' });
    }
    await desiredCard.remove();
    res.status(200).json({
      message: 'Карточка удалена!', desiredCard, // await Card.deleteOne({ _id: cardId });

    });
  } catch (err) {
    sendErrorMessage(err, res);
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    if (await cardVerification(req, res)) return;
    // eslint-disable-next-line max-len
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },);
    await res.send(newCard);
  } catch (err) {
    sendErrorMessage(err, res);
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    if (await cardVerification(req, res)) return;
    const newCard = await Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true },);
    await res.send(newCard);
  } catch (err) {
    sendErrorMessage(err, res);
  }
};
