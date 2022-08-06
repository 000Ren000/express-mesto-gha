const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    require,
  },
  link: { type: String, require },
  owner: { ref: 'user', type: mongoose.Types.ObjectId, require },
  likes: [{ type: String, ref: 'user', default: [] }],
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('card', cardSchema);
