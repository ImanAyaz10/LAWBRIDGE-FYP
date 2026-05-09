const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const lawyers = [
  {
    name: "Sarah Khan",
    email: "sarah@lawbridge.com",
    password: "password123",
    role: "lawyer",
    specialization: "Family Law",
    city: "Lahore",
    experience: "8",
    bio: "Expert in family matters and child custody with 8 years of experience in Lahore High Court."
  },
  {
    name: "Ali Raza",
    email: "ali@lawbridge.com",
    password: "password123",
    role: "lawyer",
    specialization: "Criminal Law",
    city: "Karachi",
    experience: "12",
    bio: "Renowned criminal defense attorney with a track record of high-profile cases in Karachi."
  },
  {
    name: "Fatima Noor",
    email: "fatima@lawbridge.com",
    password: "password123",
    role: "lawyer",
    specialization: "Property Law",
    city: "Islamabad",
    experience: "5",
    bio: "Specializes in real estate litigation and property documentation in Islamabad."
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing lawyers to avoid duplicates
    await User.deleteMany({ role: 'lawyer' });

    for (const lawyerData of lawyers) {
      const salt = await bcrypt.genSalt(10);
      lawyerData.password = await bcrypt.hash(lawyerData.password, salt);
      await User.create(lawyerData);
      console.log(`Added lawyer: ${lawyerData.name}`);
    }

    console.log("Seeding completed successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedDB();
