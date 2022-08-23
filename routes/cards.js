const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const {
  getCardAll,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardController');
const { ErrorCode } = require('../utils/utils');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new ErrorCode('Неправильный формат ссылки');
  }
  return value;
};
// GET /cards — возвращает все карточки
router.get('/', getCardAll);

// POST /cards — создаёт карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(validateURL),
  }),
}), createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

module.exports = router;
