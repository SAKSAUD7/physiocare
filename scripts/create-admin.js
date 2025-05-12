// This script creates an admin user in the database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/physiocare';

// Define the User schema (simplified version of the actual schema)
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ['patient', 'doctor', 'admin'],
      default: 'patient',
    },
  },
  { timestamps: true }
);

// Create the User model
const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdminUser() {
  try {
    // Connect to the database
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define admin user data
    const adminData = {
      name: 'Admin User',
      email: 'admin@physiocare.com',
      password: 'admin123',
      role: 'admin',
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      await mongoose.disconnect();
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    adminData.password = await bcrypt.hash(adminData.password, salt);

    // Create the admin user
    const admin = new User(adminData);
    await admin.save();

    console.log('Admin user created successfully');
    console.log('Email: admin@physiocare.com');
    console.log('Password: admin123');

    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

// Run the function
createAdminUser(); 