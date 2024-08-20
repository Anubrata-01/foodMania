const express = require('express');
const router = express.Router();
const Address=require("../modles/ShippingAddress");

router.post('/saveAddress',async (req, res) => {
  try {
    const { PhNo, addressLine1, city, state, zipCode, country } = req.body;

    const existingAddress=await Address.findOne({
      PhNo, 
      addressLine1, 
      city, 
      zipCode, 
     
    })
    if(existingAddress){
      return res.status(409).json({ message: 'Address already exists' });
    }
    const newAddress = new Address(req.body);
   await  newAddress.save();
    res.status(201).json({ message: 'Address saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving address', error: error.message });
  }
});

module.exports = router;
