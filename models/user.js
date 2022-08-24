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
  avatar: {
    type: String,
    validate: {
      validator(v) {
        // eslint-disable-next-line
        return /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi.test(v);
      },
      message: (props) => `${props.value} Не правильно указаны данные`,
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Не коректно введены данные',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },

}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
