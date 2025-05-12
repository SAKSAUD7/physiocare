import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { connectDB } from '@/lib/db';
import { Parser } from 'json2csv';

// Mock appointments for testing (since we don't have a real DB connection)
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
  {
    id: 'AP123459',
    service: 'Pain Management',
    doctor: 'Dr. James Rodriguez',
    patient: 'Maria Garcia',
    patientEmail: 'maria.g@example.com',
    date: '2023-11-15',
    time: '3:00 PM',
    status: 'cancelled',
    createdAt: new Date('2023-10-12').toISOString(),
  },
  {
    id: 'AP123460',
    service: 'Geriatric Physiotherapy',
    doctor: 'Dr. Emily Johnson',
    patient: 'Thomas Brown',
    patientEmail: 't.brown@example.com',
    date: '2023-12-18',
    time: '9:30 AM',
    status: 'confirmed',
    createdAt: new Date('2023-11-10').toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    // Get the format from query parameters
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const status = searchParams.get('status');
    
    // Check authentication and authorization
    const session = await getServerSession();
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Only admins can access this endpoint.' },
        { status: 403 }
      );
    }
    
    let appointments;
    
    // Try to fetch appointments from database (this would be the real implementation)
    try {
      await connectDB();
      // In a real app, this would query the Appointment model
      // appointments = await Appointment.find(status ? { status } : {}).populate('doctor').populate('patient').lean();
      
      // For now, use mock data
      appointments = status 
        ? mockAppointments.filter(appt => appt.status === status) 
        : mockAppointments;
    } catch (error) {
      console.error('Database error, using mock data:', error);
      // If DB connection fails, use mock data
      appointments = status 
        ? mockAppointments.filter(appt => appt.status === status) 
        : mockAppointments;
    }
    
    // Format data based on requested format
    switch (format) {
      case 'csv': {
        // Convert to CSV
        const fields = ['id', 'service', 'doctor', 'patient', 'patientEmail', 'date', 'time', 'status', 'createdAt'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(appointments);
        
        // Return CSV as attachment
        return new NextResponse(csv, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=appointments.csv',
          },
        });
      }
      
      case 'json':
      default:
        return NextResponse.json({ appointments });
    }
  } catch (error) {
    console.error('Error exporting appointments:', error);
    return NextResponse.json(
      { error: 'Failed to export appointments' },
      { status: 500 }
    );
  }
} 