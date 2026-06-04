const mongoose = require('mongoose');
const seedTemplates = require('../utils/templateSeeder');

let isConnected;

const connectDB = async () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbridge');
        isConnected = db.connections[0].readyState;
        console.log(`✅ MongoDB Connected: ${db.connection.host}`);
        
        // Seed legal templates if collection is empty
        await seedTemplates();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        // Avoid process.exit(1) in serverless environments
    }
};

module.exports = connectDB;
