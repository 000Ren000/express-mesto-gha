const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/usersController');

// GET /users/me - возвращает пользователя по _id
router.get('/me', getUser);

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
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

module.exports = router;
