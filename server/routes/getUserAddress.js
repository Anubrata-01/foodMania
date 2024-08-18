const express = require("express");
const router = express.Router();
const AddressSchema = require("../modles/ShippingAddress");

router.get("/getAddress", async (req, res) => {
    try {
        const addresses = await AddressSchema.find({});
        if (!addresses || addresses.length === 0) {
            return res.status(404).json({ message: "No addresses found" });
        }
        res.json(addresses);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;