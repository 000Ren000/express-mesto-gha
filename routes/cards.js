const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCardAll,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardController');
const { validateURL } = require('../utils/utils');
// GET /cards — возвращает все карточки
router.get('/', getCardAll);

// POST /cards — создаёт карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(validateURL).required(),
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
