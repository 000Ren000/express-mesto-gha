const router = require('express').Router();
const {
  getUsersAll,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/usersController');

// GET /users — возвращает всех пользователей
// router.get('/', getUsersAll);

// GET /users/me - возвращает пользователя по _id
router.get('/me', getUser);

// POST /users — создаёт пользователя
router.post('/', createUser);

// PATCH /users/me — обновляет профиль
// router.patch('/me', updateProfile);

// PATCH /users/me/avatar — обновляет аватар
// router.patch('/avatar', updateAvatar);

module.exports = router;
