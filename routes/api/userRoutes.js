const router = require('express').Router();
const { User, Thought } = require('../../models');

// /api/users
router.get(`/`, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
})

// /api/users/:userId
router.get(`/find/:userId`, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }  
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create user
router.post(`/`, async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit user
router.put(`/edit/:id`, async (req, res) => {
  try{
    const updatedData = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {_id: req.params.id},
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    res.json(updatedData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE USER
router.delete(`/delete/:id`, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'No such user exists' })
    };
    res.json({ message: 'User successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;