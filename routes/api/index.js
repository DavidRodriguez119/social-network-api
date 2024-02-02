const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const reactionRoutes = require(`./reactionRoutes`);
const friendRoutes = require(`./friendsRoutes`)

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
router.use('/friends', friendRoutes);
router.use('/reactions', reactionRoutes);

module.exports = router;
