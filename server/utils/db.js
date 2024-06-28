const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI; // connection string to MongoDB server

const connectDb = async () => {
    try {
        if (!URI) {
            console.error("MongoDB URI is not provided in environment variables.");
            process.exit(1);
        }
        await mongoose.connect(URI);
        console.log("MongoDB connected...");
    } catch (error) {
        console.error("An error occurred while trying to connect to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;

