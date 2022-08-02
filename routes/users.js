const {getUsersAll, getUser, createUser, updateProfile, updateAvatar} = require('../controllers/usersController');
const router = require('express').Router();

// GET /users — возвращает всех пользователей
router.get('/', getUsersAll);

// GET /users/:userId - возвращает пользователя по _id
router.get('/:userId', getUser)

// POST /users — создаёт пользователя
router.post('/', createUser);

// PATCH /users/me — обновляет профиль
router.patch('/me', updateProfile);

// PATCH /users/me/avatar — обновляет аватар
router.patch('/avatar', updateAvatar);

module.exports = router;