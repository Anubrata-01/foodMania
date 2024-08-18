require('dotenv').config();
const express = require("express");
const stripe = require('stripe')(process.env.SECRET_KEY);
const router = express.Router();
router.post('/create-checkout-session', async (req, res) => {
    const { products } = req.body;
  
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
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });
  
      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports=router