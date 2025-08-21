require("dotenv").config();
const mongoose = require("mongoose");
const { MY_DB } = require("../constants");

const connectDB = async () => {
  try {
    const web = await mongoose.connect(`${process.env.MONGODB_URI}/${MY_DB}`);
    console.log(`✅ MongoDB Connected: ${web.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
