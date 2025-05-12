import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './User';
import { IDoctor } from './Doctor';
import { IService } from './Service';
import { ICondition } from './Condition';

export interface IAppointment extends Document {
  patient: Types.ObjectId | IUser;
  doctor: Types.ObjectId | IDoctor;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  service: Types.ObjectId | IService;
  condition?: Types.ObjectId | ICondition;
  location: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  totalAmount: number;
  paymentId?: string;
  rating?: number;
  review?: string;
}

const AppointmentSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Please provide an appointment date'],
    },
    startTime: {
      type: String,
      required: [true, 'Please provide a start time'],
    },
    endTime: {
      type: String,
      required: [true, 'Please provide an end time'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    condition: {
      type: Schema.Types.ObjectId,
      ref: 'Condition',
    },
    location: {
      address: {
        type: String,
        required: [true, 'Please provide an address'],
      },
      city: {
        type: String,
        required: [true, 'Please provide a city'],
      },
      state: {
        type: String,
        required: [true, 'Please provide a state'],
      },
      postalCode: {
        type: String,
        required: [true, 'Please provide a postal code'],
      },
      country: {
        type: String,
        required: [true, 'Please provide a country'],
        default: 'United States',
      },
    },
    notes: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    totalAmount: {
      type: Number,
      required: [true, 'Please provide a total amount'],
    },
    paymentId: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
    },
  },
  { timestamps: true }
);

// Update doctor rating when a review is added
AppointmentSchema.post('save', async function () {
  if (this.rating && this.review) {
    const doctorModel = mongoose.models.Doctor;
    const appointmentModel = mongoose.models.Appointment;
    
    // Calculate new rating
    const appointments = await appointmentModel.find({ 
      doctor: this.doctor, 
      rating: { $exists: true } 
    });
    
    const totalRatings = appointments.length;
    const sumRatings = appointments.reduce((sum, appointment) => sum + (appointment.rating || 0), 0);
    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
    
    // Update doctor rating
    await doctorModel.findByIdAndUpdate(this.doctor, {
      rating: averageRating,
      reviewCount: totalRatings,
    });
  }
});

export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema); 