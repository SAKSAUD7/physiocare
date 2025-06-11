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
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Helper function to check if MongoDB is connected
export function isConnected() {
  return mongoose.connection.readyState === 1;
}

// Helper function to gracefully disconnect from MongoDB
export async function disconnectDB() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
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

// Handle connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
}); 