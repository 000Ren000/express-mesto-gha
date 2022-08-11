const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак Иф Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь океанов',
  },
  avatar: { type: String, default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png' },
  email: {
    type: String,
    require: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Не коректно введены данные',
    },
  },
  password: { type: String, minLength: 1 },

});

module.exports = mongoose.model('user', userSchema);
