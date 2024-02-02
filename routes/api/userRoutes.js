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

router.post(`/`, (req, res) => {
  
})

module.exports = router;


    // // create a new user
    // async createUser(req, res) {
    //   try {
    //     const user = await User.create(req.body);
    //     res.json(user);
    //   } catch (err) {
    //     res.status(500).json(err);
    //   }
    // },
    // // Delete a user and associated apps
    // async deleteUser(req, res) {
    //   try {
    //     const user = await User.findOneAndDelete({ _id: req.params.userId });
  
    //     if (!user) {
    //       return res.status(404).json({ message: 'No user with that ID' });
    //     }
  
    //     await Application.deleteMany({ _id: { $in: user.applications } });
    //     res.json({ message: 'User and associated apps deleted!' })
    //   } catch (err) {
    //     res.status(500).json(err);
    //   }
    // },