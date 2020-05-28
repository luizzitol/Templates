require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.log(err);
        return process.exit(1);
      }
      console.log("connected to DB");
    }
  );
};

module.exports = connectDB;
