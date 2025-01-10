// const crypto =  require('crypto');
const axios = require('axios');
const Cashfree = require('cashfree-pg');

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.CFEnvironment.SANDBOX;

exports.createOrder = async (req, res) => {
    try {
        console.log(process.env.CASHFREE_APP_ID, process.env.CASHFREE_SECRET_KEY);

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
            order_amount: 1,
            order_id: 'ORID' + new Date().getTime(),
            order_currency: 'INR',
        };

        // Making POST request
        const response = await axios.post(url, data, { headers });

        // Returning the payment session ID
        return res.status(200).json({
            status: 'success',
            payment_session_id: response.data.payment_session_id
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
    console.log(orderid)
    try {
        const options = {
            method: 'GET',
            url: `https://sandbox.cashfree.com/pg/orders/${orderid}`,
            headers: {
                accept: 'application/json',
                'x-api-version': '2022-09-01',
                'x-client-id': process.env.CASHFREE_APP_ID,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY
            }
        };

        axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            if(response.data.order_status === "PAID"){
                return res.status(200).json({
                    status: 'success',
                    message: 'payment was successful'
                });
            } else if(response.data.order_status === "ACTIVE"){
                return
            } else{
                return res.status(402).json({
                    status: 'fail',
                    message: 'payment failure'
                });
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