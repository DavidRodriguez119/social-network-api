const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
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
};
  