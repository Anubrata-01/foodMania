// import mongoose from "mongoose";
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  PhNo: Number,
  addressLine1: String,
  city:String,
  state:String,
  zipCode:Number,
  country:String
});

const Address = mongoose.models.addresses || mongoose.model("addresses", AddressSchema );

module.exports= Address;