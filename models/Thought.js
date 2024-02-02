const mongoose = require('mongoose');
const reactionSchema = require(`./Reactions`)

const formatdate = (date) => {
  return date.getmonth()
}

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280},
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => formatdate(date)
  },
});

// Create a virtual property `reactionCount` that gets the amount of reactions per post
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;