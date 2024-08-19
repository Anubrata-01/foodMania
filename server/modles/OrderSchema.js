const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    username:String,
    orderId: String,
    amount: Number,
    status: String,
    orderedTime: { type: Date, default: Date.now }
  });
  const Order = mongoose.models.orders || mongoose.model("orders", OrderSchema );

  module.exports=Order;