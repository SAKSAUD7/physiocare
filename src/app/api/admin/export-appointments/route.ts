import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { connectDB } from '@/lib/db';
import { Parser } from 'json2csv';
import Appointment from '@/models/Appointment';

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

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    
    const appointments = await Appointment.find({})
      .populate('patient', 'name email')
      .populate('doctor', 'name email')
      .lean();
    
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Error exporting appointments:', error);
    return NextResponse.json(
      { error: 'Failed to export appointments' },
      { status: 500 }
    );
  }
} 