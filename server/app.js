const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
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

if (process.env.NODE_ENV === 'production') {
  // Corrected path to client/dist
  const clientPath = path.join(__dirname, '..', 'client', 'dist');
  
  console.log(`Serving static files from: ${clientPath}`);
  
  // Check if the client/dist directory exists
  if (fs.existsSync(clientPath)) {
    console.log('client/dist directory exists');
    
    // Serve static files from the React app
    app.use(express.static(clientPath));

    // Serve the index.html file for any request that doesn't match an API route or static file
    app.get('*', function(req, res) {
      console.log(`Catch-all route hit for: ${req.url}`);
      res.sendFile(path.join(clientPath, 'index.html'));
    });
  } else {
    console.error('client/dist directory does not exist');
    app.use((req, res) => {
      res.status(500).send('Server configuration error: client/dist not found');
    });
  }
} else {
  // Handle development environment
  app.get('/', (req, res) => {
    res.send('Backend is running. React app is served by the development server.');
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error occurred: ${err.stack}`);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));