const {getUsersAll, getUser, createUser} = require('../controllers/usersController');
const router = require('express').Router();

// GET /users — возвращает всех пользователей
router.get('/', getUsersAll);

// GET /users/:userId - возвращает пользователя по _id
router.get('/:userId', getUser)

// POST /users — создаёт пользователя
router.post('/', createUser);

module.exports = router;