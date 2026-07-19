const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://dipiikaa2025_db_user:MNm0NzDtYAkHLlTH@hirehub.fnwjnq2.mongodb.net/hirehub",
  );

  console.log("Connected to DB successfully");
};

module.exports = connectDB;
