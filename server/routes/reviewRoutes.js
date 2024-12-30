const express = require('express');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();

router.route('/:id')
    .get(authController.protect, authController.verify, reviewController.getReviews)
    .post(authController.protect, authController.verify, reviewController.createReview)

module.exports = router;