const router = require('express').Router();
const { User, Thought, reactionSchema } = require('../../models');

// /api/thoughts
router.get(`/`, async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/thoughts/:thoughtId
router.get(`/find/:thoughtId`, async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .lean();
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }  
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
    res.json(updatedThought);
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
});

// Create a reaction 
router.post(`/:thoughtId/reactions`, async (req, res) => {
  try {
    console.log('You are adding a reaction');
    const thoughtSelected = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!thoughtSelected) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' })
    }
    res.json(thoughtSelected);
  } catch (err) {
    res.status(500).json(err);
  }
});

// remove a reaction
router.delete(`/:thoughtId/reactions/:reactionId`, async (req, res) => {
  try {
    const thoughtSelected = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thoughtSelected) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
    }

    res.json(thoughtSelected);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
