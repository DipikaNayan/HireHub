const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected to DB successfully");
};

module.exports = connectDB;

// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ Connected to DB successfully");
//   } catch (error) {
//     console.error("❌ Database connection failed:");
//     console.error(error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
