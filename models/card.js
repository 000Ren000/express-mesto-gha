const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    require,
  },
  link: { type: String, require },
  owner: { ref: 'user', type: mongoose.Types.ObjectId, require },
  likes: [{
    type: String,
    validate: {
      validator(v) {
        return validator.isUrl(v);
      },
    },
    ref: 'user',
    default: [],
  }],
  createdAt: { type: Date, default: Date.now() },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
