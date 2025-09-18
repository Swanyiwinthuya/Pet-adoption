# Complete Data Schema Guide

## Overview

This document provides a comprehensive overview of all data models in the Pet Adoption Management System. The system uses MongoDB with Mongoose ODM and includes five main entity types: Pets, Users, Admins, Adoption Requests, and Adopters.

## Quick Reference

### Collections Summary

| Collection | Purpose | Est. Documents | Key Features |
|------------|---------|----------------|-------------|
| `pets` | Pet information | 20-1000+ | Animal types, breeds, medical info |
| `users` | User accounts | 100-10000+ | Authentication, profiles |
| `admins` | Admin accounts | 1-10 | System management |
| `adoptionrequests` | Adoption applications | 50-5000+ | Pet requests, scheduling |
| `adopters` | Detailed adopter profiles | 50-1000+ | Extended user info, screening |

### Key Relationships

- **AdoptionRequest → Pet**: Each request references a specific pet
- **User ↔ Adopter**: Adopters may link to user accounts via email
- **User.role**: Users can have admin privileges

## Detailed Model Schemas

### 1. Pet Model

**Collection**: `pets`  
**File**: `src/lib/models/Pet.js`

```javascript
{
  name: String,           // Required, max 50 chars
  animal: String,         // Required, enum: ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'other']
  breed: String,          // Required, max 50 chars
  age: Number,            // Required, 0-30 years
  medicalCondition: String, // Required, max 500 chars
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

**Indexes**: `animal`, `breed`, `age`, `createdAt`

**Sample Data**:
```json
{
  "name": "Bella",
  "animal": "dog",
  "breed": "Labrador Mix",
  "age": 2,
  "medicalCondition": "Healthy, vaccinated. Up to date on all shots and spayed."
}
```

### 2. User Model

**Collection**: `users`  
**File**: `src/lib/models/User.js`

```javascript
{
  email: String,          // Required, unique, validated
  password: String,       // Required, min 6 chars, bcrypt hashed
  name: String,           // Required, max 100 chars
  photo: String,          // Optional, URL format
  phone: String,          // Required, 8-15 digits
  role: String,           // Enum: ['user', 'admin'], default: 'user'
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

**Indexes**: `email` (unique), `createdAt`

**Features**:
- Password hashing with bcrypt (salt rounds: 12)
- Email format validation
- Phone number validation (international format)
- Role-based access control

### 3. Admin Model

**Collection**: `admins`  
**File**: `src/lib/models/Admin.js`

```javascript
{
  email: String,          // Required, unique, validated
  password: String,       // Required, min 6 chars, bcrypt hashed
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

**Indexes**: `email` (unique), `createdAt`

**Features**:
- Simplified admin-only authentication
- Same password security as users
- Separate from user accounts for security

### 4. Adoption Request Model

**Collection**: `adoptionrequests`  
**File**: `src/lib/models/AdoptionRequest.js`

```javascript
{
  userName: String,           // Required, max 100 chars
  phoneNumber: String,        // Required, validated format
  pet: ObjectId,              // Required, references Pet._id
  pickupDate: Date,           // Required, must be future date
  message: String,            // Required, max 1000 chars
  responsibilityAccepted: Boolean, // Required, must be true
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-generated
}
```

**Indexes**: `pet`, `pickupDate`, `createdAt`

**Business Rules**:
- Pickup date must be in the future
- Responsibility must be accepted (true)
- Pet reference must exist

### 5. Adopter Model (Extended Profile)

**Collection**: `adopters`  
**Note**: This is an extended model based on the AdoptersTable component

```javascript
{
  name: String,               // Required, max 100 chars
  email: String,              // Required, email format
  phone: String,              // Required, formatted
  status: String,             // Enum: ['active', 'approved', 'pending', 'rejected']
  experience: String,         // Enum: ['first-time', 'some', 'experienced']
  housingType: String,        // Enum: ['house', 'apartment', 'condo', 'townhouse', 'other']
  petPreference: String,      // Free text: 'dog', 'cat', 'any', 'small dog', etc.
  applicationDate: Date,      // Date of application
  lastContact: Date,          // Last contact date
  
  // Extended fields
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String           // Default: 'Thailand'
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String      // 'spouse', 'parent', 'sibling', 'friend'
  },
  veterinarianInfo: {
    clinicName: String,
    doctorName: String,
    phone: String
  },
  notes: String,              // Max 1000 chars
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `email`, `status`, `experience`, `applicationDate`, `createdAt`

## Implementation Guidelines

### 1. Database Setup

```bash
# Install dependencies
npm install mongoose bcryptjs

# Set up environment
echo "MONGODB_URI=mongodb://localhost:27017/pet_adoption" > .env.local

# Import sample data
npm run seed
```

### 2. Model Usage Examples

#### Creating a Pet
```javascript
import Pet from '@/lib/models/Pet';

const newPet = new Pet({
  name: 'Buddy',
  animal: 'dog',
  breed: 'Golden Retriever',
  age: 2,
  medicalCondition: 'Healthy, well-trained'
});

await newPet.save();
```

#### User Authentication
```javascript
import User from '@/lib/models/User';

// Create user (password auto-hashed)
const user = new User({
  email: 'user@example.com',
  password: 'securepassword',
  name: 'John Doe',
  phone: '+1234567890'
});

// Verify password
const isValid = await user.comparePassword('securepassword');
```

#### Adoption Request with Population
```javascript
import AdoptionRequest from '@/lib/models/AdoptionRequest';

// Create request
const request = new AdoptionRequest({
  userName: 'Sarah Johnson',
  phoneNumber: '+1234567890',
  pet: petId,
  pickupDate: new Date('2024-02-15'),
  message: 'I would love to adopt this pet',
  responsibilityAccepted: true
});

// Find with pet details
const requests = await AdoptionRequest.find()
  .populate('pet', 'name animal breed')
  .sort({ createdAt: -1 });
```

### 3. Validation Examples

#### Email Validation
```javascript
// Built into User and Admin models
validate: {
  validator: function(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  },
  message: 'Please enter a valid email address'
}
```

#### Phone Validation
```javascript
// International format support
validate: {
  validator: function(v) {
    return /^[\+]?[\d]{8,15}$/.test(v);
  },
  message: 'Please enter a valid phone number'
}
```

#### Future Date Validation
```javascript
// For adoption requests
validate: {
  validator: function(v) {
    return v > new Date();
  },
  message: 'Pickup date must be in the future'
}
```

## API Endpoints Structure

### Recommended API Routes

```
/api/pets
  GET    - List all pets (with filtering)
  POST   - Create new pet (admin only)
  
/api/pets/[id]
  GET    - Get specific pet
  PUT    - Update pet (admin only)
  DELETE - Delete pet (admin only)

/api/users
  POST   - Register new user
  
/api/users/[id]
  GET    - Get user profile
  PUT    - Update user profile

/api/adoption-requests
  GET    - List requests (admin only)
  POST   - Submit new request
  
/api/adoption-requests/[id]
  GET    - Get specific request
  PUT    - Update request status (admin only)
  DELETE - Cancel request

/api/adopters
  GET    - List adopters (admin only)
  POST   - Create adopter profile
  
/api/adopters/[id]
  GET    - Get adopter details
  PUT    - Update adopter info

/api/auth/login
  POST   - User/Admin login
  
/api/auth/register
  POST   - User registration
```

## Security Considerations

### 1. Password Security
- All passwords hashed with bcrypt (salt rounds: 12)
- Never store plain text passwords
- Implement password strength requirements

### 2. Input Validation
- Server-side validation for all inputs
- Trim whitespace automatically
- Validate email formats
- Sanitize user inputs

### 3. Access Control
- Role-based permissions (user/admin)
- Protect admin endpoints
- Validate ObjectId references

### 4. Data Privacy
- Don't expose password hashes in API responses
- Limit personal information in public endpoints
- Implement proper error handling

## Performance Optimization

### 1. Indexing Strategy
```javascript
// Compound indexes for common queries
db.pets.createIndex({ animal: 1, age: 1 });
db.adoptionrequests.createIndex({ pet: 1, createdAt: -1 });
db.adopters.createIndex({ status: 1, applicationDate: -1 });
```

### 2. Query Optimization
- Use `.select()` to limit returned fields
- Implement pagination for large datasets
- Use `.populate()` efficiently
- Cache frequently accessed data

### 3. Connection Management
```javascript
// Mongoose connection with options
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

## Testing Data

### Sample Data Files
- `sample_pet_data.json` - 20 diverse pets
- `complete_data_schema.json` - Full schema documentation
- `pet_data_schema.json` - Pet-specific schema

### Seeding Commands
```bash
# Import pets
npm run seed

# Alternative seeding
npm run seed:simple

# Direct MongoDB import
mongoimport --db pet_adoption --collection pets --file sample_pet_data.json --jsonArray
```

## Migration and Deployment

### 1. Environment Setup
```bash
# Development
MONGODB_URI=mongodb://localhost:27017/pet_adoption

# Production (MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pet_adoption
```

### 2. Data Migration
- Export existing data before schema changes
- Test migrations on development data
- Implement rollback procedures
- Document schema version changes

### 3. Monitoring
- Monitor query performance
- Track collection sizes
- Set up alerts for errors
- Regular backup procedures

## Troubleshooting

### Common Issues

1. **Connection Errors**
   - Check MongoDB service status
   - Verify connection string
   - Check network connectivity

2. **Validation Errors**
   - Review required fields
   - Check data types
   - Validate enum values

3. **Performance Issues**
   - Review query patterns
   - Check index usage
   - Monitor memory usage

4. **Authentication Problems**
   - Verify password hashing
   - Check user roles
   - Review JWT implementation

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcryptjs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

**Files Created:**
- `complete_data_schema.json` - Complete JSON schema
- `DATA_SCHEMA_GUIDE.md` - This comprehensive guide
- `pet_data_schema.json` - Pet-specific schema (existing)
- `sample_pet_data.json` - Sample data (existing)

**Model Files:**
- `src/lib/models/Pet.js` - Pet model
- `src/lib/models/User.js` - User model
- `src/lib/models/Admin.js` - Admin model
- `src/lib/models/AdoptionRequest.js` - Adoption request model

For implementation questions or schema modifications, refer to the individual model files and this comprehensive guide.