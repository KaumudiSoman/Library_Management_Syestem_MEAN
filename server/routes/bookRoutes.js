const express = require('express');
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, authController.verify, bookController.getAllBooks)
    .post(authController.protect, authController.verify, authController.hasPermission('LIBRARIAN'), bookController.createBook);

router.route('/:id')
    .get(authController.protect, authController.verify, bookController.getBook)
    .patch(authController.protect, authController.verify, authController.hasPermission('LIBRARIAN'), bookController.updateBook)
    .delete(authController.protect, authController.verify, authController.hasPermission('LIBRARIAN'), bookController.deleteBook);

router.route('/search').post(authController.protect, authController.verify, bookController.searchBooks);

module.exports = router;