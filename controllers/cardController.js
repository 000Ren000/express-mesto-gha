const Card = require('../models/card');
const {
  DataChangeError, // 409
} = require('../utils/utils');

// eslint-disable-next-line consistent-return
// const cardVerification = async (req, res) => {
//   if (!Card.exists({ _id: req.params.cardId })) {
//     return res.status(404).json({ message: 'Карточка не найдена' });
//   }

const cardVerification = async (req, res) => {
  if (!Card.exists({ _id: req.params.cardId })) {
    return res.status(404).json({ message: 'Карточка не найдена' });
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
    next(err);
  }
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
// eslint-disable-next-line consistent-return
module.exports.deleteCard = async (req, res, next) => {
  try {
    cardVerification(req, res);
    const userId = req.user._id;
    const { cardId } = req.params;
    // eslint-disable-next-line consistent-return
    const desiredCard = await Card.findById(cardId);
    if (desiredCard.owner.toString() !== userId) {
      throw new DataChangeError('Нет прав на удоление');
    }
    await desiredCard.remove();
    res.status(200).json({
      message: 'Карточка удалена!', desiredCard, // await Card.deleteOne({ _id: cardId });

    });
  } catch (err) {
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    cardVerification(req, res);
    // eslint-disable-next-line max-len
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    await res.send(newCard);
  } catch (err) {
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    cardVerification(req, res);
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    await res.send(newCard);
  } catch (err) {
    next(err);
  }
};
