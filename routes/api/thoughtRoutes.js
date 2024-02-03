const router = require('express').Router();
const { User, Thought } = require('../../models');
const { User, Thought, reactionSchema } = require('../../models');

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

// create thought
router.post(`/`, async (req, res) => {
  try {
    const thought = await Thought.create(req.body)
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit user
router.put(`/edit/:id`, async (req, res) => {
  try{
    const updatedData = req.body;
    const updatedThought = await Thought.findOneAndUpdate(
      {_id: req.params.id},
      { $set: req.body },
      {new: true}
    );
    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(updatedData);
  } catch (err) {
    res.status(500).json(err);
  }
}); 

// DELETE USER
router.delete(`/delete/:id`, async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.id });
    if (!thought) {
      return res.status(404).json({ message: 'No such thought exists' })
    };
    res.json({ message: 'Thought successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;
