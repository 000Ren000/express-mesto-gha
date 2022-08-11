const bcrypt = require('bcrypt');
const User = require('../models/user');
const { SAL_ROUND } = require('../config');
const { sendErrorMessage, NOTFOUND_ERROR, ERROR_CODE } = require('../utils/utils');

const excludedFields = '-password -__v';

module.exports.getUsersAll = async (req, res) => {
  try {
    // eslint-disable-next-line consistent-return
    const users = await User.find({}, excludedFields);
    await res.send(users);
  } catch (err) {
    sendErrorMessage(err, res);
  }
};

module.exports.getUser = async (req, res) => {
  const _id = req.params.userId;
  try {
    const user = await User.find({ _id }, excludedFields);
    if (!(await User.exists({ _id }))) {
      res
        .status(NOTFOUND_ERROR)
        .send({ message: 'Запрашиваемый пользователь не найден' });
      return;
    }
    res.send(user);
  } catch (err) {
    sendErrorMessage(err, res);
  }
};

// eslint-disable-next-line consistent-return
module.exports.createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email,
    } = req.body;
    if (req.body.password === undefined || req.body.email === undefined) {
      return res.status(ERROR_CODE).send({ message: 'Не правильно переданы данные' });
    }
    const password = await bcrypt.hash(req.body.password.toString(), SAL_ROUND);
    const newUser = await User.create({
      name, about, avatar, email, password,
    });
    res.status(201).send({
      _id: newUser._id,
      about: newUser.about,
      name: newUser.name,
      avatar: newUser.avatar,
      email: newUser.email,
    });
  } catch (err) {
    sendErrorMessage(err, res);
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body; // получим из объекта запроса имя и описание пользователя
    const newUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    await res.send(newUser);
  } catch (err) {
    sendErrorMessage(err, res);
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body; // получим из объекта запроса имя и описание пользователя
    const newUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    );
    await res.send(newUser);
  } catch (err) {
    sendErrorMessage(err, res);
  }
};
