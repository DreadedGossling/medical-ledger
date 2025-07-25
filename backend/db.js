const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connected: ${conn.connection.host}`);
    return conn.connection
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;