const express = require('express');
const authController = require('./../controllers/authController');
const borrowHistoryController = require('./../controllers/borrowHistoryController');

const router = express.Router();

router.route('/').get(authController.protect, authController.verify, authController.isMember, borrowHistoryController.getMyBookHistory);
router.route('/borrow/:id').post(authController.protect, authController.verify, authController.isMember, borrowHistoryController.borrowBook);
router.route('/return/:id').post(authController.protect, authController.verify, authController.isMember, borrowHistoryController.returnBook);

module.exports = router;