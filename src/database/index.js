require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const web = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${web.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
