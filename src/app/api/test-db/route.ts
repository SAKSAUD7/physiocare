import { NextResponse } from 'next/server';
import { connectDB, isConnected, testConnection } from '@/backend/db/database';

/**
 * GET handler for testing database connection
 */
export async function GET() {
  try {
    // Use the dedicated test function from our database module
    const connected = await testConnection();
    
    if (connected) {
      return NextResponse.json({ 
        status: 'success', 
        message: 'Successfully connected to MongoDB',
        connected: true
      });
    } else {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Failed to connect to MongoDB',
        connected: false
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error testing DB connection:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: 'Error testing MongoDB connection',
      error: error instanceof Error ? error.message : String(error),
      connected: false
    }, { status: 500 });
  }
} 
import { connectDB, isConnected, testConnection } from '@/backend/db/database';

/**
 * GET handler for testing database connection
 */
export async function GET() {
  try {
    // Use the dedicated test function from our database module
    const connected = await testConnection();
    
    if (connected) {
      return NextResponse.json({ 
        status: 'success', 
        message: 'Successfully connected to MongoDB',
        connected: true
      });
    } else {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Failed to connect to MongoDB',
        connected: false
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error testing DB connection:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: 'Error testing MongoDB connection',
      error: error instanceof Error ? error.message : String(error),
      connected: false
    }, { status: 500 });
  }
} 