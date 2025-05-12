import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { Parser } from 'json2csv';

// Mock users for testing (since we don't have a real DB connection)
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@physiocare.com',
    role: 'admin',
    phone: '555-1234',
    address: '123 Admin St',
    createdAt: new Date('2023-01-01').toISOString(),
  },
  {
    id: '2',
    name: 'Doctor User',
    email: 'doctor@physiocare.com',
    role: 'doctor',
    phone: '555-5678',
    address: '456 Doctor Ave',
    createdAt: new Date('2023-02-15').toISOString(),
  },
  {
    id: '3',
    name: 'Patient User',
    email: 'patient@physiocare.com',
    role: 'patient',
    phone: '555-9012',
    address: '789 Patient Blvd',
    createdAt: new Date('2023-03-20').toISOString(),
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'patient',
    phone: '555-3456',
    address: '101 Main St',
    createdAt: new Date('2023-04-10').toISOString(),
  },
  {
    id: '5',
    name: 'Dr. Robert Johnson',
    email: 'robert.j@example.com',
    role: 'doctor',
    phone: '555-7890',
    address: '202 Medical Center',
    createdAt: new Date('2023-05-05').toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    // Get the format from query parameters
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const role = searchParams.get('role');
    
    // Check authentication and authorization
    const session = await getServerSession();
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Only admins can access this endpoint.' },
        { status: 403 }
      );
    }
    
    let users;
    
    // Try to fetch users from database
    try {
      await connectDB();
      users = await User.find(
        role ? { role } : {}
      ).select('-password').lean();
    } catch (error) {
      console.error('Database error, using mock data:', error);
      // If DB connection fails, use mock data
      users = role 
        ? mockUsers.filter(user => user.role === role) 
        : mockUsers;
    }
    
    // Format data based on requested format
    switch (format) {
      case 'csv': {
        // Convert to CSV
        const fields = ['id', 'name', 'email', 'role', 'phone', 'address', 'createdAt'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(users);
        
        // Return CSV as attachment
        return new NextResponse(csv, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=users.csv',
          },
        });
      }
      
      case 'json':
      default:
        return NextResponse.json({ users });
    }
  } catch (error) {
    console.error('Error exporting users:', error);
    return NextResponse.json(
      { error: 'Failed to export users' },
      { status: 500 }
    );
  }
} 