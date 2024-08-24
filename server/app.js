const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectToDB = require('./database/db');
const saveAddress = require("./routes/saveAddress");
const getAddress = require("./routes/getUserAddress");
const checkoutSession = require("./routes/checkOutSession");
const paymentSuccess = require("./routes/paymentSuccess");
const orderDetails = require("./routes/getOrderDetails");
const updateAddress = require("./routes/updateAddress");
dotenv.config();
app.use(express.json());

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://foodmaniaclient.onrender.com'
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));;

const PORT = process.env.PORT || 7000;

app.get('/', (req, res) => {
  res.send('Backend is running');
});

connectToDB();

app.use('/api', checkoutSession);
app.use('/api', saveAddress);
app.use('/api', getAddress);
app.use('/api', paymentSuccess);
app.use('/api', orderDetails);
app.use('/api', updateAddress);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
