const router = require('express').Router();
const {
  updateThought,
  getAllThought, 
  addThought,
  removeThought,
  addReaction,
  removeReaction,
  getThoughtById
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/
router.route('/').get(getAllThought);

// /api/thoughts/<thoughtId>
router.route('/:thoughtId/:userId')
    .put(updateThought)
    .delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(addReaction);

// /api/thoughts/<thougthId>/<userId>/<reactionId>
router.route('/:thoughtId/:reactionId').put(removeReaction);

module.exports = router;
