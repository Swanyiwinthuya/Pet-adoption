import mongoose from 'mongoose';

const adoptionRequestSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  pickupDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'Pickup date must be in the future'
    }
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  responsibilityAccepted: {
    type: Boolean,
    required: true,
    default: false,
    validate: {
      validator: function(v) {
        return v === true;
      },
      message: 'You must accept responsibility for adopting the pet'
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
adoptionRequestSchema.index({ pet: 1 });
adoptionRequestSchema.index({ pickupDate: 1 });
adoptionRequestSchema.index({ createdAt: -1 });

const AdoptionRequest = mongoose.models.AdoptionRequest || mongoose.model('AdoptionRequest', adoptionRequestSchema);

export default AdoptionRequest;

