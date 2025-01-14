const express = require('express');
const wishListController = require('./../controllers/wishlistController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, authController.verify, authController.isMember, wishListController.getWishlist);

router.route('/:id')
    .post(authController.protect, authController.verify, authController.isMember, wishListController.createWishlistRecord)
    .delete(authController.protect, authController.verify, authController.isMember, wishListController.deleteWishlistRecord);

module.exports = router;