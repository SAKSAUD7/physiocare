import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: number; // in minutes
  image?: string;
  isActive: boolean;
  category: string;
  benefits: string[];
  slug: string;
}

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a service name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a service description'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short description'],
      maxlength: [200, 'Short description cannot be more than 200 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    duration: {
      type: Number,
      required: [true, 'Please provide a duration'],
      min: [15, 'Duration must be at least 15 minutes'],
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Sports Rehabilitation',
        'Orthopedic Rehabilitation',
        'Neurological Rehabilitation',
        'Geriatric Physiotherapy',
        'Pediatric Physiotherapy',
        'Women Health',
        'Pain Management',
        'Post-Surgical Rehabilitation',
        'Cardiopulmonary Rehabilitation',
        'Other',
      ],
    },
    benefits: {
      type: [String],
      required: [true, 'Please provide benefits of the service'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Create slug from name before saving
ServiceSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
  next();
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema); 