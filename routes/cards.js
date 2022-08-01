const {getCardAll, createCard, deleteCard} = require('../controllers/cardController');
const router = require('express').Router();

// Маршруты и запросы


// GET /cards — возвращает все карточки
router.get('/', getCardAll);

// POST /cards — создаёт карточку
router.post('/', createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/:cardId', deleteCard)


module.exports = router;