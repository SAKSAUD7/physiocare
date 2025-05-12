import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './User';

export interface IDoctor extends Document {
  user: Types.ObjectId | IUser;
  specialization: string;
  qualifications: string[];
  experience: number; // in years
  bio: string;
  profileImage?: string;
  availableHours: {
    day: string;
    slots: {
      startTime: string;
      endTime: string;
    }[];
  }[];
  services: Types.ObjectId[];
  conditions: Types.ObjectId[];
  rating: number;
  reviewCount: number;
  consultationFee: number;
  isVerified: boolean;
  isAvailable: boolean;
}

const DoctorSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    specialization: {
      type: String,
      required: [true, 'Please provide a specialization'],
    },
    qualifications: {
      type: [String],
      required: [true, 'Please provide qualifications'],
    },
    experience: {
      type: Number,
      required: [true, 'Please provide years of experience'],
    },
    bio: {
      type: String,
      required: [true, 'Please provide a biography'],
      maxlength: [1000, 'Bio cannot be more than 1000 characters'],
    },
    profileImage: {
      type: String,
    },
    availableHours: [
      {
        day: {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          required: true,
        },
        slots: [
          {
            startTime: {
              type: String,
              required: true,
            },
            endTime: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
    conditions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Condition',
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
    consultationFee: {
      type: Number,
      required: [true, 'Please provide a consultation fee'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema); 