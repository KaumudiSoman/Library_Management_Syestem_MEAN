const express = require('express');
const authController = require('./../controllers/authController');
const borrowHistoryController = require('./../controllers/borrowHistoryController');

const router = express.Router();

router.route('/').get(authController.protect, authController.verify, borrowHistoryController.getMyBookHistory);
router.route('/borrow/:id').post(authController.protect, authController.verify, borrowHistoryController.borrowBook);
router.route('/return/:id').post(authController.protect, authController.verify, borrowHistoryController.returnBook);

module.exports = router;