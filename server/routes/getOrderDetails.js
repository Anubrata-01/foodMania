const express = require("express");
const router = express.Router();
const Order = require("../modles/OrderSchema");

router.get("/getOrders", async (req, res) => {
    try {
        const Orders = await Order.find({});
        if (!Orders || Orders.length === 0) {
            return res.status(404).json({ message: "No addresses found" });
        }
        res.json(Orders);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;