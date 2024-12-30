const express = require('express');
const authController = require('./../controllers/authController');
const ratingController = require('./../controllers/ratingController');

const router = express.Router();

router.route('/:id').post(authController.protect, authController.verify, ratingController.createRating);

module.exports = router;