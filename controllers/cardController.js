const Card = require('../models/card');
const { NotFoundError } = require('../utils/Errors/NotFoundError');
const { DataChangeError } = require('../utils/Errors/DataChangeError');
const { checkValidation } = require('../utils/utils');

const cardVerification = async (desiredCard, next) => {
  // if (!Card.exists({ _id: req.params.cardId })) {
  if (!desiredCard) {
    next(new NotFoundError('Карточка не найдена'));
  }
};

// GET /cards — возвращает все карточки
module.exports.getCardAll = async (req, res, next) => {
  try {
    const allCard = await Card.find({});
    res.send(allCard);
  } catch (err) {
    next(err);
  }
};

// POST /cards — создаёт карточку
module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send(newCard);
  } catch (err) {
    checkValidation(err, next);
  }
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
// eslint-disable-next-line consistent-return
module.exports.deleteCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;
    // eslint-disable-next-line consistent-return
    const desiredCard = await Card.findById(cardId);
    cardVerification(desiredCard, next);
    if (desiredCard.owner.toString() !== userId) {
      throw new DataChangeError('Нет прав на удоление');
    }
    await desiredCard.remove();
    res.status(200).json({
      message: 'Карточка удалена!', desiredCard,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    cardVerification(newCard, next);
    res.send(newCard);
  } catch (err) {
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!newCard) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.send(newCard);
  } catch (err) {
    next(err);
  }
};
