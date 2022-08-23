const bcrypt = require('bcrypt');
const User = require('../models/user');
const { SAL_ROUND } = require('../config');
const {
  createJWT,
  checkValidation,
} = require('../utils/utils');
const { NotFoundError } = require('../utils/Errors/NotFoundError');
const { TokenError } = require('../utils/Errors/TokenError');

module.exports.getUsersAll = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById({ _id: userId });
    if (!(await User.exists({ id: userId }))) {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.find({ _id });
    if (!(await User.exists({ _id }))) {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const password = await bcrypt.hash(req.body.password.toString(), SAL_ROUND);
    const newUser = await User.create({ email, password });
    res.status(201).send({
      _id: newUser._id,
      about: newUser.about,
      name: newUser.name,
      avatar: newUser.avatar,
      email: newUser.email,
    });
  } catch (err) {
    checkValidation(err, next);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body; // получим из объекта запроса имя и описание пользователя
    const newUser = await User.findByIdAndUpdate(req.user._id, { name, about }, {
      new: true, runValidators: true,
    });
    await res.send(newUser);
  } catch (err) {
    checkValidation(err, next);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const newUser = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    await res.send(newUser);
  } catch (err) {
    checkValidation(err, next);
  }
};

// eslint-disable-next-line consistent-return
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new TokenError('Не правильно переданы данные');
    if (bcrypt.compareSync(password.toString(), user.password.toString())) {
      res.status(201).json({ jwt: createJWT(user._id) });
    } else throw new TokenError('Не правильно переданы данные');
  } catch (err) {
    checkValidation(err, next);
  }
};
