const mongoose = require('mongoose');

const formatDate = (date) => {
  return date.toISOString().slice(0, 10);
}

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => formatDate(date)
  }
},
{
  toJSON: { getters: true },
}
);

module.exports = reactionSchema;