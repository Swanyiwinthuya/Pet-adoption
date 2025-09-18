import mongoose from 'mongoose';

const adopterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Accept various phone formats including international
        return /^[\+]?[\d\s\-\(\)]{10,20}$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'approved', 'pending', 'rejected'],
    default: 'pending'
  },
  experience: {
    type: String,
    required: true,
    enum: ['first-time', 'some', 'experienced']
  },
  housingType: {
    type: String,
    required: true,
    enum: ['house', 'apartment', 'condo', 'townhouse', 'other']
  },
  petPreference: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  applicationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  lastContact: {
    type: Date,
    default: Date.now
  },
  address: {
    street: {
      type: String,
      trim: true,
      maxlength: 200
    },
    city: {
      type: String,
      trim: true,
      maxlength: 100
    },
    state: {
      type: String,
      trim: true,
      maxlength: 100
    },
    zipCode: {
      type: String,
      trim: true,
      maxlength: 20
    },
    country: {
      type: String,
      trim: true,
      maxlength: 100,
      default: 'Thailand'
    }
  },
  emergencyContact: {
    name: {
      type: String,
      trim: true,
      maxlength: 100
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^[\+]?[\d\s\-\(\)]{10,20}$/.test(v);
        },
        message: 'Please enter a valid emergency contact phone number'
      }
    },
    relationship: {
      type: String,
      trim: true,
      maxlength: 50,
      enum: ['spouse', 'parent', 'sibling', 'friend', 'other', '']
    }
  },
  veterinarianInfo: {
    clinicName: {
      type: String,
      trim: true,
      maxlength: 200
    },
    doctorName: {
      type: String,
      trim: true,
      maxlength: 100
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^[\+]?[\d\s\-\(\)]{10,20}$/.test(v);
        },
        message: 'Please enter a valid veterinarian phone number'
      }
    }
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 1000
  }
}, {
  timestamps: true
});

// Indexes for better query performance
adopterSchema.index({ email: 1 });
adopterSchema.index({ status: 1 });
adopterSchema.index({ experience: 1 });
adopterSchema.index({ applicationDate: -1 });
adopterSchema.index({ createdAt: -1 });

// Compound indexes for common queries
adopterSchema.index({ status: 1, applicationDate: -1 });
adopterSchema.index({ experience: 1, status: 1 });

// Virtual for full address
adopterSchema.virtual('fullAddress').get(function() {
  if (!this.address) return '';
  
  const parts = [
    this.address.street,
    this.address.city,
    this.address.state,
    this.address.zipCode,
    this.address.country
  ].filter(Boolean);
  
  return parts.join(', ');
});

// Virtual for days since application
adopterSchema.virtual('daysSinceApplication').get(function() {
  if (!this.applicationDate) return 0;
  
  const now = new Date();
  const diffTime = Math.abs(now - this.applicationDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
});

// Virtual for days since last contact
adopterSchema.virtual('daysSinceLastContact').get(function() {
  if (!this.lastContact) return 0;
  
  const now = new Date();
  const diffTime = Math.abs(now - this.lastContact);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
});

// Method to update last contact date
adopterSchema.methods.updateLastContact = function() {
  this.lastContact = new Date();
  return this.save();
};

// Method to change status
adopterSchema.methods.changeStatus = function(newStatus, notes = '') {
  this.status = newStatus;
  this.lastContact = new Date();
  
  if (notes) {
    this.notes = this.notes ? `${this.notes}\n\n${new Date().toISOString()}: ${notes}` : notes;
  }
  
  return this.save();
};

// Static method to find by status
adopterSchema.statics.findByStatus = function(status) {
  return this.find({ status }).sort({ applicationDate: -1 });
};

// Static method to find by experience level
adopterSchema.statics.findByExperience = function(experience) {
  return this.find({ experience }).sort({ applicationDate: -1 });
};

// Static method to find recent applications
adopterSchema.statics.findRecentApplications = function(days = 30) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return this.find({ 
    applicationDate: { $gte: cutoffDate } 
  }).sort({ applicationDate: -1 });
};

// Static method to find adopters needing follow-up
adopterSchema.statics.findNeedingFollowUp = function(days = 7) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return this.find({
    status: { $in: ['pending', 'active'] },
    lastContact: { $lte: cutoffDate }
  }).sort({ lastContact: 1 });
};

const Adopter = mongoose.models.Adopter || mongoose.model('Adopter', adopterSchema);

export default Adopter;