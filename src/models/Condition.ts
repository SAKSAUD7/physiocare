import mongoose, { Schema, Document } from 'mongoose';

export interface ICondition extends Document {
  name: string;
  description: string;
  shortDescription: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  image?: string;
  slug: string;
  category: string;
  relatedServices: mongoose.Types.ObjectId[];
}

const ConditionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a condition name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a condition description'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short description'],
      maxlength: [200, 'Short description cannot be more than 200 characters'],
    },
    symptoms: {
      type: [String],
      required: [true, 'Please provide symptoms'],
    },
    causes: {
      type: [String],
      required: [true, 'Please provide causes'],
    },
    treatments: {
      type: [String],
      required: [true, 'Please provide treatments'],
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Musculoskeletal',
        'Neurological',
        'Cardiovascular',
        'Respiratory',
        'Pediatric',
        'Geriatric',
        'Sports Injuries',
        'Post-Surgical',
        'Chronic Pain',
        'Other',
      ],
    },
    relatedServices: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
  },
  { timestamps: true }
);

// Create slug from name before saving
ConditionSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
  next();
});

export default mongoose.models.Condition || mongoose.model<ICondition>('Condition', ConditionSchema); 