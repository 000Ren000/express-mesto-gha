const router = require('express').Router();
const {
  getUsersAll,
  getUser,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/usersController');

router.get('/me', getUser);
// GET /users — возвращает всех пользователей
router.get('/', getUsersAll);

// GET /users/:userId - возвращает пользователя по _id
router.get('/:userId', getUserById);

// POST /users — создаёт пользователя
router.post('/', createUser);

// PATCH /users/me — обновляет профиль
router.patch('/me', updateProfile);

// PATCH /users/me/avatar — обновляет аватар
router.patch('/avatar', updateAvatar);

module.exports = router;
