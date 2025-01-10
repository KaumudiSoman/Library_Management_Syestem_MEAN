const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.route('/order').post(paymentController.createOrder);
router.route('/status/:orderid').get(paymentController.checkStatus);

module.exports = router;