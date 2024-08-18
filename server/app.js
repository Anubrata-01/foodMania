const express = require('express');
const app = express();
const cors=require("cors");
const connectToDB = require('./database/db');
const saveAddress=require("./routes/saveAddress");
const getAddress=require("./routes/getUserAddress")
const checkoutSession=require("./routes/checkOutSession")
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

const PORT = process.env.PORT || 7000;
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
connectToDB();
app.use('/api',checkoutSession);
app.use('/api',saveAddress);
app.use('/api',getAddress);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
