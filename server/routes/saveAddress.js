const express = require('express');
const router = express.Router();
const Address=require("../modles/ShippingAddress");

router.post('/saveAddress', (req, res) => {
  try {
    const newAddress = new Address(req.body);
     newAddress.save();
    res.status(201).json({ message: 'Address saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving address', error: error.message });
  }
});

module.exports = router;
