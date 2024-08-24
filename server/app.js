const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./database/db');
const saveAddress = require("./routes/saveAddress");
const getAddress = require("./routes/getUserAddress");
const checkoutSession = require("./routes/checkOutSession");
const paymentSuccess = require("./routes/paymentSuccess");
const orderDetails = require("./routes/getOrderDetails");
const updateAddress = require("./routes/updateAddress");
app.use(express.json());
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://foodmaniaclient.onrender.com"
// ];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));
app.use(cors({
  origin: "https://foodmaniaclient.onrender.com"
}));

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
