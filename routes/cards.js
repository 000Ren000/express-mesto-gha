const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCardAll,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardController');

// const validateURL = (value) => {
//   // eslint-disable-next-line no-undef
//   if (!validator.isURL(value, { require_protocol: true })) {
//     throw new ErrorCode('Неправильный формат ссылки');
//   }
//   return value;
// };
// GET /cards — возвращает все карточки
router.get('/', getCardAll);

// POST /cards — создаёт карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string(),
  }),
}), createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(2),
  }),
}), deleteCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(2),
  }),
}), likeCard);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(2),
  }),
}), dislikeCard);

module.exports = router;
