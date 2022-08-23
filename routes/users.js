const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsersAll,
  getUser,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/usersController');
const { validateURL } = require('../utils/utils');

router.get('/me', getUser);
// GET /users — возвращает всех пользователей
router.get('/', getUsersAll);

// GET /users/:userId - возвращает пользователя по _id
router.get('/:userId', getUserById);

// POST /users — создаёт пользователя
router.post('/', createUser);

// PATCH /users/me — обновляет профиль
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

// PATCH /users/me/avatar — обновляет аватар
router.patch('/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL),
  }),
}), updateAvatar);

module.exports = router;
