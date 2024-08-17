
const  mongoose = require('mongoose');
const connectToDB = async () => {
    const connectionUrl = "mongodb+srv://anubratachanda:Anubrata3604@cluster0.bgzku.mongodb.net/shippingAddress?retryWrites=true&w=majority&appName=Cluster0"

  try {
    await mongoose.connect(connectionUrl);
    console.log("shippingaddress Database connection is successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    // throw error; // Re-throw the error for higher-level error handling
  }
};

module.exports = connectToDB;
