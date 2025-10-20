const express = require('express');
const router = express.Router();

const controller = require('../controllers/reviewController');

router.get('/', controller.readAllReview);
router.post('/:challenge_id', controller.createReview);
router.put('/:id', controller.updateReviewById);
router.delete('/:id', controller.deleteReviewById);
//Test
module.exports = router;