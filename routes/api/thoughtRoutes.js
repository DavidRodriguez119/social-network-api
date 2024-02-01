const router = require('express').Router();
const { User, Thought } = require('../../models');

// /api/thoughts
router.get(`/`, async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
})
    // .post(createThought);

// /api/thoughts/:thoughtId
router.get(`/find/:thoughtId`, async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }  
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
