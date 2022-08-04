const {
  getCardAll,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardController');
const router = require('express').Router();

// Маршруты и запросы

// GET /cards — возвращает все карточки
router.get('/', getCardAll);

// POST /cards — создаёт карточку
router.post('/', createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/:cardId', deleteCard);

//PUT /cards/:cardId/likes — поставить лайк карточке
router.put('/:cardId/likes', likeCard);

//DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
