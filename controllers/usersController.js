const bcrypt = require('bcrypt');
const User = require('../models/user');
const { SAL_ROUND } = require('../config');
const {
  createJWT,
  NotFoundError, // 404
  ErrorCode, // 400
  DataChangeError, // 409
} = require('../utils/utils');

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
    const user = await User.findOne({ email });
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
    if (err.code === 11000) {
      next(new DataChangeError('Не правильно переданы данные'));
    } else if (err.name === 'ValidationError') {
      next(new ErrorCode('Не правильно переданы данные'));
    } else next(err);
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
    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const newUser = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    await res.send(newUser);
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line consistent-return
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (password === undefined || email === undefined) {
      throw ErrorCode('Не правильно переданы данные');
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new DataChangeError('Не правильно переданы данные');
    if (bcrypt.compareSync(password.toString(), user.password.toString())) {
      res.status(201).json({ jwt: createJWT(user._id) });
    } else throw new DataChangeError('Не правильно переданы данные');
  } catch (err) {
    next(err);
  }
};
