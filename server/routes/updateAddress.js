const express = require("express");
const router = express.Router();
const AddressSchema = require("../modles/ShippingAddress");

router.put("/updateAddress", async (req, res) => {
    try {
        const {_id, PhNo, addressLine1, city, state, zipCode, country } = req.body;

        if (!_id) {
            return res.status(400).json({ message: "Address ID is required" });
        }

        const updatedAddress = await AddressSchema.findByIdAndUpdate(
            _id,
            { PhNo, addressLine1, city, state, zipCode, country },
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.json({ message: "Address updated successfully", address: updatedAddress });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;