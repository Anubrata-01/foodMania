require('dotenv').config();
const express = require("express");
const stripe = require('stripe')(process.env.SECRET_KEY);
const router = express.Router();
const Order = require("../modles/OrderSchema");


router.post('/create-checkout-session', async (req, res) => {
  const { products,userDetails } = req.body;

  const lineItems = products.map(product => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.name,
      },
      unit_amount: product.price,
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
    });
    const totalAmount = lineItems.reduce((sum, item) => sum + (item.price_data.unit_amount * item.quantity), 0);

    // Create a new order in the database
    const newOrder = new Order({
      username:userDetails?.name,
      orderId: session.id,
      amount: totalAmount / 100, 
      status: 'pending'
    });

    await newOrder.save();

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;