require('dotenv').config();

const express = require('express');
const app = express();
const cors=require("cors");
const connectToDB = require('./database/db');
const Address=require("./modles/ShippingAddress")
const stripe = require('stripe')(process.env.SECRET_KEY);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

const PORT = process.env.PORT || 7000;
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
connectToDB();


app.post('/api/create-checkout-session', async (req, res) => {
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
app.post('/api/saveAddress', async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    await newAddress.save();
    res.status(201).json({ message: 'Address saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving address', error: error.message });
  }
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
