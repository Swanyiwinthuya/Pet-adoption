import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  animal: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'other']
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 30
  },
  medicalCondition: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Indexes for better query performance
petSchema.index({ animal: 1 });
petSchema.index({ breed: 1 });
petSchema.index({ age: 1 });
petSchema.index({ createdAt: -1 });

const Pet = mongoose.models.Pet || mongoose.model('Pet', petSchema);

export default Pet;

