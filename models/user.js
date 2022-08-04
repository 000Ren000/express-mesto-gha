const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 30, require },
  about: { type: String, minLength: 2, maxLength: 30, require },
  avatar: { type: String, require },
});

module.exports = mongoose.model('user', userSchema);
