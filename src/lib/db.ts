import mongoose from 'mongoose';

// Updated MongoDB Atlas connection string with new credentials
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://saksaud:D1fwF4logv2XNvMa@saksaud.is2duuq.mongodb.net/physiocare";

// Define the shape of our cached MongoDB connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Add global type declaration
declare global {
  var mongoose: MongooseCache | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Initialize cache if it doesn't exist
if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  // If we already have a connection, return it
  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log('Using existing MongoDB connection');
    return cached.conn;
  }

  // If connection state is connecting or disconnecting, wait a moment and reset
  if (mongoose.connection.readyState === 2 || mongoose.connection.readyState === 3) {
    console.log('MongoDB connection in transition, waiting briefly...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 15000, // Increased timeout
      socketTimeoutMS: 45000,
      family: 4
    };

    try {
      console.log('Initiating new MongoDB connection with updated credentials...');
      cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then((mongoose) => {
          console.log('Successfully connected to MongoDB Atlas');
          return mongoose;
        })
        .catch((err) => {
          console.error('MongoDB connection error - falling back to mock data:', err.message);
          cached.promise = null;
          throw err; // Rethrow to ensure proper error handling
        });
    } catch (error) {
      console.error('Unexpected error during MongoDB connection:', error);
      cached.promise = null;
      throw error; // Rethrow to ensure proper error handling
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error in cached.conn:', e);
    // Even if connection fails, return mongoose for fallback to mock data
  }

  return cached.conn || mongoose;
}

// Helper function to check if MongoDB is connected
export function isConnected() {
  return mongoose.connection.readyState === 1;
}

// Helper function to gracefully disconnect from MongoDB
export async function disconnectDB() {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('Disconnected from MongoDB Atlas');
  }
}

// Function to test the MongoDB connection
export async function testConnection() {
  try {
    await connectDB();
    if (isConnected()) {
      console.log('MongoDB connection test successful');
      return true;
    } else {
      console.error('MongoDB connection test failed - not connected');
      return false;
    }
  } catch (error) {
    console.error('MongoDB connection test failed with error:', error);
    return false;
  }
} 