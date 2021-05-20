const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@neog-cluster.fs70b.mongodb.net/inventory?retryWrites=true&w=majority`;

const MongoClient = async () => {
  try {
    const connect = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log({ success: true, message: "Successfully connected to the DB" });
  } catch (error) {
    console.log({
      success: false,
      error: "Error Connecting to the DB",
      messgae: error.messgae,
    });
  }
};

module.exports = { MongoClient };
