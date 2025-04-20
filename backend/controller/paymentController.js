const express = require('express');
const Razorpay = require('razorpay');
const dotenv = require('dotenv')

dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const payment=async(req,res)=>{
    try {
        const {amount} = req.body
        const options = {
          amount: amount * 100, // Razorpay needs amount in paisa
          currency: "INR",
          receipt: "receipt_" + Date.now()
        };
    
        const order = await razorpay.orders.create(options);
        res.json(order);
      } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Payment order creation failed' });
      }
}

module.exports = payment