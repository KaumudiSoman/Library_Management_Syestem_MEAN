const express = require('express');
const wishListController = require('./../controllers/wishlistController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, authController.verify, wishListController.getWishlist);
    // .post(authController.protect, wishListController.createWishlistRecord);

router.route('/:id')
    .post(authController.protect, authController.verify, wishListController.createWishlistRecord)
    .delete(authController.protect, authController.verify, wishListController.deleteWishlistRecord);

module.exports = router;