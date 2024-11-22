const express = require('express');
const wishListController = require('./../controllers/wishlistController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, wishListController.getWishlist)
    .post(authController.protect, wishListController.createWishlistRecord);

router.route('/:id').delete(authController.protect, wishListController.deleteWishlistRecord);

module.exports = router;