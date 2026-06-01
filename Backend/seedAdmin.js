require('dotenv').config();
console.log('MongoDB URI:', process.env.MONGODB_URI);
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existing = await Admin.findOne({
      email: 'lawbridge79@gmail.com',
    });

    if (existing) {
      console.log('Admin already exists');
      process.exit();
    }

    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'lawbridge79@gmail.com',
      password: 'LB*@123#IBL',
      role: 'admin',
    });

    console.log('Admin created:', admin.email);

    process.exit();
  } catch (err) {
    console.error('Failed to seed admin:', err);
    process.exit(1);
  }
})();