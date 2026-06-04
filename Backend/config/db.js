const mongoose = require('mongoose');
const seedTemplates = require('../utils/templateSeeder');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lawbridge');
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        
        // Seed legal templates if collection is empty
        await seedTemplates();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
