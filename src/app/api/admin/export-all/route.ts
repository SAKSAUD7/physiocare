import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { connectDB } from '@/lib/db';
import { Parser } from 'json2csv';

// Define all mock data directly in this file
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

const mockAppointments = [
  {
    id: 'AP123456',
    service: 'Sports Injury Rehabilitation',
    doctor: 'Dr. Emily Johnson',
    patient: 'John Smith',
    patientEmail: 'john.smith@example.com',
    date: '2023-12-15',
    time: '10:00 AM',
    status: 'confirmed',
    createdAt: new Date('2023-11-01').toISOString(),
  },
  {
    id: 'AP123457',
    service: 'Orthopedic Rehabilitation',
    doctor: 'Dr. Michael Chen',
    patient: 'Jane Wilson',
    patientEmail: 'jane.wilson@example.com',
    date: '2023-12-22',
    time: '2:30 PM',
    status: 'pending',
    createdAt: new Date('2023-11-05').toISOString(),
  },
  {
    id: 'AP123458',
    service: 'Neurological Rehabilitation',
    doctor: 'Dr. Sarah Williams',
    patient: 'Robert Thompson',
    patientEmail: 'r.thompson@example.com',
    date: '2023-11-28',
    time: '11:00 AM',
    status: 'completed',
    createdAt: new Date('2023-10-20').toISOString(),
  },
];

// Mock services data
const mockServices = [
  {
    id: '1',
    name: 'Sports Injury Rehabilitation',
    price: 85,
    duration: 60,
    description: 'Specialized therapy for athletes and active individuals recovering from sports-related injuries.',
  },
  {
    id: '2',
    name: 'Orthopedic Rehabilitation',
    price: 90,
    duration: 60,
    description: 'Therapy for musculoskeletal conditions, including post-surgical rehabilitation.',
  },
  {
    id: '3',
    name: 'Neurological Rehabilitation',
    price: 95,
    duration: 60,
    description: 'Specialized care for patients with neurological conditions such as stroke or Parkinson\'s disease.',
  },
];

export async function GET(request: NextRequest) {
  try {
    // Get the format from query parameters
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    
    // Check authentication and authorization
    const session = await getServerSession();
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Only admins can access this endpoint.' },
        { status: 403 }
      );
    }
    
    // In a real app, we'd fetch the data from the database
    // Here we'll just use the mock data
    const data = {
      users: mockUsers,
      appointments: mockAppointments,
      services: mockServices,
    };
    
    // Format data based on requested format
    switch (format) {
      case 'csv': {
        // For CSV, we need to create separate files for each data type
        // Here we'll just create one for users as an example
        const fields = ['id', 'name', 'email', 'role', 'phone', 'address', 'createdAt'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(mockUsers);
        
        // Return CSV as attachment
        return new NextResponse(csv, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=all_data_users.csv',
          },
        });
      }
      
      case 'json':
      default:
        return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error exporting all data:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
} 