require('dotenv').config();
const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.SECRET_KEY);
const Order = require("../modles/OrderSchema");

router.post('/payment-success', async (req, res) => {
    const { session_id } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.payment_status === 'paid') {
        await Order.findOneAndUpdate(
          { orderId: session_id },
          { status: 'paid' }
        );
  
        res.json({ success: true, message: 'Payment successful and order updated' });
      } else {
        res.status(400).json({ success: false, message: 'Payment not successful' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;
