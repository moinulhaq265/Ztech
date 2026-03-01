const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState;
        console.log('🚀 Connected to Ztech Nexus (Serverless)');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        throw error;
    }
};

module.exports = connectDB;
