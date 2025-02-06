const express = require('express');
const paymentController = require('../controllers/paymentController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/membership/order').post(paymentController.createOrderForMembership);
router.route('/membership/status/:orderid').get(paymentController.checkStatusForMembership);
router.route('/late-fee/order')
    .post(authController.protect, authController.verify, authController.isMember, paymentController.createOrderForLateFee);
router.route('/late-fee/status')
    .get(paymentController.checkStatusForLateFee);

module.exports = router;