const axios = require('axios');
const Cashfree = require('cashfree-pg');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.CFEnvironment.SANDBOX;

exports.createOrder = async (req, res) => {
    try {
        let amount = 0;
        if(req.body.duration == '6') {
            amount = 500;
        }
        else {
            amount = 1000;
        }
        const url = 'https://sandbox.cashfree.com/pg/orders';
        const headers = {
            accept: 'application/json',
            'x-api-version': '2023-08-01',
            'content-type': 'application/json',
            'x-client-id': process.env.CASHFREE_APP_ID,
            'x-client-secret': process.env.CASHFREE_SECRET_KEY,
        };

        const data = {
            customer_details: {
                customer_id: req.body.userId,
                customer_email: req.body.email,
                customer_phone: req.body.contactNo,
                customer_name: req.body.username,
            },
            order_meta: {
                payment_methods: 'cc,dc,upi',
            },
            order_amount: amount,
            order_id: uuidv4(),
            order_currency: 'INR',
        };

        // Making POST request
        const response = await axios.post(url, data, { headers });

        // Returning the payment session ID
        return res.status(200).json({
            status: 'success',
            payment_session_id: response.data.payment_session_id,
            order_id: response.data.order_id
        });

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.checkStatus = async (req, res) => {
    const orderid = req.params.orderid
    console.log('order id: ', orderid);
    try {
        const options = {
            method: 'GET',
            url: `https://sandbox.cashfree.com/pg/orders/${orderid}`,
            headers: {
                accept: 'application/json',
                'x-api-version': '2023-08-01',
                'x-client-id': process.env.CASHFREE_APP_ID,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY
            }
        };

        axios
        .request(options)
        .then(async function (response) {
            console.log(response.data);
            if(response.data.order_status === "PAID"){
                const user = await User.findById(response.data.customer_id);
                user.isMember = true;
                user.save();
                return res.redirect('http://localhost:4200/payment-success');
            } else if(response.data.order_status === "ACTIVE"){
                return res.status(200).json({
                    status: 'pending',
                    message: 'Payment is pending or in progress.',
                });
            } else{
                return res.redirect('http://localhost:4200/payment-failure');
            }
        })
        .catch(function (error) {   
            return console.error(error);
        });
       
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
}