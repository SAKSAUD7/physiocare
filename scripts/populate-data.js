// This script populates the database with initial data
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/physiocare';

// Define schemas for all models
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
    phone: String,
    address: String,
  },
  { timestamps: true }
);

const DoctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    specialization: String,
    qualifications: [String],
    experience: Number,
    bio: String,
    profileImage: String,
    availableHours: [
      {
        day: String,
        slots: [
          {
            startTime: String,
            endTime: String,
          },
        ],
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    consultationFee: Number,
    isVerified: {
      type: Boolean,
      default: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ServiceSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    shortDescription: String,
    price: Number,
    duration: Number,
    image: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    category: String,
    benefits: [String],
    slug: String,
  },
  { timestamps: true }
);

// Define models
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

// Sample data
const doctorsData = [
  {
    name: 'Dr. Emily Johnson',
    email: 'emily.johnson@physiocare.com',
    password: 'doctor123',
    phone: '555-1234',
    specialization: 'Sports Rehabilitation',
    qualifications: ['DPT', 'OCS', 'CSCS'],
    experience: 8,
    bio: 'Dr. Emily Johnson specializes in sports injury rehabilitation and has worked with professional athletes across multiple sports. She focuses on evidence-based treatments and personalized recovery plans.',
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    consultationFee: 85,
  },
  {
    name: 'Dr. Michael Chen',
    email: 'michael.chen@physiocare.com',
    password: 'doctor123',
    phone: '555-2345',
    specialization: 'Orthopedic Rehabilitation',
    qualifications: ['DPT', 'MTC', 'OCS'],
    experience: 12,
    bio: 'With over 12 years of experience, Dr. Chen specializes in orthopedic rehabilitation and post-surgical recovery. He believes in a holistic approach that combines manual therapy with therapeutic exercises.',
    profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80',
    consultationFee: 90,
  },
  {
    name: 'Dr. Sarah Williams',
    email: 'sarah.williams@physiocare.com',
    password: 'doctor123',
    phone: '555-3456',
    specialization: 'Neurological Rehabilitation',
    qualifications: ['DPT', 'NCS', 'CBIS'],
    experience: 10,
    bio: 'Dr. Williams specializes in neurological rehabilitation, helping patients recover from strokes, brain injuries, and other neurological conditions. She is passionate about improving mobility and independence.',
    profileImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
    consultationFee: 95,
  }
];

const servicesData = [
  {
    name: 'Sports Injury Rehabilitation',
    description: 'Comprehensive rehabilitation programs for athletes and active individuals recovering from sports-related injuries. Our specialized approach combines therapeutic exercises, manual therapy, and cutting-edge techniques to restore function, improve performance, and prevent future injuries.',
    shortDescription: 'Specialized therapy for athletes and active individuals recovering from sports-related injuries.',
    price: 85,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'Rehabilitation',
    benefits: ['Faster recovery from sports injuries', 'Improved athletic performance', 'Injury prevention strategies', 'Sport-specific rehabilitation protocols'],
    slug: 'sports-injury-rehabilitation',
  },
  {
    name: 'Orthopedic Rehabilitation',
    description: 'Expert care for musculoskeletal conditions including post-surgical rehabilitation, joint replacements, fractures, and chronic pain. Our evidence-based treatment plans focus on restoring mobility, strength, and function to help you return to your daily activities pain-free.',
    shortDescription: 'Therapy for musculoskeletal conditions, including post-surgical rehabilitation.',
    price: 90,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'Rehabilitation',
    benefits: ['Reduced pain and inflammation', 'Improved joint mobility', 'Enhanced strength and stability', 'Accelerated recovery after surgery'],
    slug: 'orthopedic-rehabilitation',
  },
  {
    name: 'Neurological Rehabilitation',
    description: 'Specialized physiotherapy for patients with neurological conditions such as stroke, Parkinson\'s disease, multiple sclerosis, and brain injuries. Our targeted interventions aim to improve movement, balance, and coordination while enhancing quality of life and independence.',
    shortDescription: 'Specialized care for patients with neurological conditions.',
    price: 95,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'Rehabilitation',
    benefits: ['Improved balance and coordination', 'Enhanced mobility and walking ability', 'Increased independence in daily activities', 'Personalized neurological recovery programs'],
    slug: 'neurological-rehabilitation',
  }
];

async function populateDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Doctor.deleteMany({});
    await Service.deleteMany({});
    // Don't delete users, just add the new ones

    // Add services
    console.log('Adding services...');
    await Service.insertMany(servicesData);

    // Add doctors
    console.log('Adding doctors...');
    for (const doctorData of doctorsData) {
      // Check if user already exists
      let user = await User.findOne({ email: doctorData.email });
      
      if (!user) {
        // Create user account for doctor
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(doctorData.password, salt);
        
        user = await User.create({
          name: doctorData.name,
          email: doctorData.email,
          password: hashedPassword,
          role: 'doctor',
          phone: doctorData.phone,
        });
      }
      
      // Create doctor profile linked to user
      await Doctor.create({
        user: user._id,
        specialization: doctorData.specialization,
        qualifications: doctorData.qualifications,
        experience: doctorData.experience,
        bio: doctorData.bio,
        profileImage: doctorData.profileImage,
        consultationFee: doctorData.consultationFee,
        availableHours: [
          {
            day: 'Monday',
            slots: [
              { startTime: '09:00', endTime: '10:00' },
              { startTime: '10:30', endTime: '11:30' },
              { startTime: '13:00', endTime: '14:00' },
              { startTime: '14:30', endTime: '15:30' },
            ],
          },
          {
            day: 'Wednesday',
            slots: [
              { startTime: '09:00', endTime: '10:00' },
              { startTime: '10:30', endTime: '11:30' },
              { startTime: '13:00', endTime: '14:00' },
            ],
          },
          {
            day: 'Friday',
            slots: [
              { startTime: '13:00', endTime: '14:00' },
              { startTime: '14:30', endTime: '15:30' },
              { startTime: '16:00', endTime: '17:00' },
            ],
          },
        ],
      });
    }

    console.log('Database populated successfully!');
    console.log('Services created:', servicesData.length);
    console.log('Doctors created:', doctorsData.length);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
}

// Run the population function
populateDatabase(); 