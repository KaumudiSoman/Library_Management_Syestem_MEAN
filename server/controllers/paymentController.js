const axios = require('axios');
const Cashfree = require('cashfree-pg');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const BorrowHistory = require('../models/borrowHistoryModel');

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.CFEnvironment.SANDBOX;

exports.createOrderForMembership = async (req, res) => {
    try {
        let amount = 0;
        const user = await User.findById(req.body.userId);
        user.membershipDuration = req.body.duration;
        user.save();
        if(req.body.duration == 12) {
            amount = 1000;
        }
        else {
            amount = 500;
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
                customer_id: user._id,
                customer_email: user.email,
                customer_phone: user.contactNo,
                customer_name: user.username,
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

exports.checkStatusForMembership = async (req, res) => {
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

        const response = await axios.request(options);
        console.log(response.data);
            if(response.data.order_status === "PAID"){
                console.log(response.data.customer_details.customer_id);
                const user = await User.findById(response.data.customer_details.customer_id);
                user.isMember = true;
                user.memberAt = Date.now();

                if(user.membershipDuration == 6) {
                    user.membershipExpiry = new Date(new Date(user.memberAt).setMonth(new Date(user.memberAt).getMonth() + 6)); 
                }
                else {
                    user.membershipExpiry = new Date(new Date(user.memberAt).setMonth(new Date(user.memberAt).getFullYear() + 1)); 
                }
                user.save();

                return res.redirect('http://localhost:4200/payment-success');
            }
            else if(response.data.order_status === "ACTIVE"){
                return res.status(200).json({
                    status: 'pending',
                    message: 'Payment is pending or in progress.',
                });
            }
            else{
                return res.redirect('http://localhost:4200/payment-failure');
            }
       
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
}

exports.createOrderForLateFee = async (req, res) => {
    console.log(req.user.username);
    try {
        let amount = 50;
        const user = await User.findById(req.user._id);
        // if(req.body.overdueDuration == 12) {
        //     amount = 1000;
        // }
        // else {
        //     amount = 500;
        // }
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
                customer_id: user._id,
                customer_email: user.email,
                customer_phone: user.contactNo,
                customer_name: user.username,
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

exports.checkStatusForLateFee = async (req, res) => {
    // const orderid = req.params.orderid
    // console.log('order id: ', orderid);
    console.log(req.query.orderId);
    console.log(req.query.bookId);
    console.log(req.query.userId);
    // const orderId = req.query.inputbody.
    // console.log('user id: ', req.body.inputbody);
    // console.log('book id: ', req.body.bookId);
    try {
        const options = {
            method: 'GET',
            url: `https://sandbox.cashfree.com/pg/orders/${req.query.orderId}`,
            headers: {
                accept: 'application/json',
                'x-api-version': '2023-08-01',
                'x-client-id': process.env.CASHFREE_APP_ID,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY
            }
        };

        const response = await axios.request(options);
        console.log(response.data);
            if(response.data.order_status === "PAID"){
                console.log(response.data.customer_details.customer_id);
                const borrowRecord = await BorrowHistory.findOne({userId: req.query.userId, bookId: req.query.bookId});
                borrowRecord.isLate = false;
                borrowRecord.save()

                return res.redirect('http://3.109.2.11/payment-success');
            }
            else if(response.data.order_status === "ACTIVE"){
                return res.status(200).json({
                    status: 'pending',
                    message: 'Payment is pending or in progress.',
                });
            }
            else{
                return res.redirect('http://3.109.2.11/payment-failure');
            }
       
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
}