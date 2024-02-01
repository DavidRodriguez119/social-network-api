const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280},
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reaction'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a virtual property `reactionCount` that gets the amount of reactions per post
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;