const express = require('express');
const path = require('path');
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
const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CORS_ORIGIN
    : process.env.LOCAL_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Database connection
connectToDB();

// API routes
app.use('/api', checkoutSession);
app.use('/api', saveAddress);
app.use('/api', getAddress);
app.use('/api', paymentSuccess);
app.use('/api', orderDetails);
app.use('/api', updateAddress);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the correct 'dist' directory
  app.use(express.static(path.join(__dirname, 'client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  });
} else {
  // Handle development environment
  app.get('/', (req, res) => {
    res.send('Backend is running. React app is served by the development server.');
  });
}

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

