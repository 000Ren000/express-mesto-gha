const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 30, require: true },
  about: { type: String, minLength: 2, maxLength: 30, require: true },
  avatar: { type: String, require: true },
});

module.exports = mongoose.model('user', userSchema);
