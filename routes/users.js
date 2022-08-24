const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { validateURL } = require('../utils/utils');
const {
  getUser,
  getUsersAll,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/usersController');

router.get('/me', getUser);
// get /users — возвращает всех пользователей
router.get('/', getUsersAll);

// get /users/:userid - возвращает пользователя по _id
router.get('/:userId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

// post /users — создаёт пользователя
router.post('/', createUser);

// patch /users/me — обновляет профиль
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

// patch /users/me/avatar — обновляет аватар
router.patch('/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL),
  }),
}), updateAvatar);

module.exports = router;
