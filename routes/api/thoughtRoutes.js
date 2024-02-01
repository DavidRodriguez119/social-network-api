const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createUser,
} = require('../../controllers/thoughtControllers');

// /api/thoughts
router.route('/').get(getThoughts)
    // .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoguhtId').get(getSingleThought);

module.exports = router;
