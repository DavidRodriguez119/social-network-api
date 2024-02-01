const mongoose = require('mongoose');
const { STRING } = require('sequelize');

const reactionSchema = new mongoose.Schema({
    reactionId: { 
        Type: mongoose.Schema.Types.ObjectId, 
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        Type: String, 
        required: true,
        maxlength: 280,
    },
    username: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;