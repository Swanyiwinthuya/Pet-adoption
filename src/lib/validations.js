// Form validation schemas and utilities
import { isValidEmail, isValidPhoneNumber } from './utils';

// Base validation class
class Validator {
  constructor() {
    this.errors = {};
  }

  // Add error
  addError(field, message) {
    if (!this.errors[field]) {
      this.errors[field] = [];
    }
    this.errors[field].push(message);
  }

  // Check if field is required
  required(value, field, message = 'This field is required') {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      this.addError(field, message);
      return false;
    }
    return true;
  }

  // Validate email
  email(value, field, message = 'Please enter a valid email address') {
    if (value && !isValidEmail(value)) {
      this.addError(field, message);
      return false;
    }
    return true;
  }

  // Validate phone number
  phone(value, field, message = 'Please enter a valid phone number') {
    if (value && !isValidPhoneNumber(value)) {
      this.addError(field, message);
      return false;
    }
    return true;
  }

  // Validate minimum length
  minLength(value, length, field, message = `Must be at least ${length} characters long`) {
    if (value && value.length < length) {
      this.addError(field, message);
      return false;
    }
    return true;
  }

  // Validate maximum length
  maxLength(value, length, field, message = `Must be no more than ${length} characters long`) {
    if (value && value.length > length) {
      this.addError(field, message);
      return false;
    }
    return true;
  }

  // Validate number range
  numberRange(value, min, max, field, message = `Must be between ${min} and ${max}`) {
    const num = parseFloat(value);
    if (!isNaN(num) && (num < min || num > max)) {
      this.addError(field, message);
      return false;
    }
    return true;
  }

  // Validate that value is in allowed options
  oneOf(value, options, field, message = 'Please select a valid option') {
    if (value && !options.includes(value)) {
      this.addError(field, message);
      return false;
    }
    return true;
  }

  // Get validation errors
  getErrors() {
    return this.errors;
  }

  // Check if validation passed
  isValid() {
    return Object.keys(this.errors).length === 0;
  }

  // Clear errors
  clearErrors() {
    this.errors = {};
  }
}

// Pet form validation
export function validatePetForm(data) {
  const validator = new Validator();

  validator.required(data.name, 'name', 'Pet name is required');
  validator.maxLength(data.name, 50, 'name', 'Pet name must be 50 characters or less');

  validator.required(data.species, 'species', 'Species is required');
  validator.oneOf(data.species, ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Hamster', 'Guinea Pig', 'Other'], 'species');

  validator.required(data.breed, 'breed', 'Breed is required');
  validator.maxLength(data.breed, 50, 'breed', 'Breed must be 50 characters or less');

  validator.required(data.age, 'age', 'Age is required');
  validator.numberRange(data.age, 0, 30, 'age', 'Age must be between 0 and 30 years');

  validator.required(data.healthStatus, 'healthStatus', 'Health status is required');
  validator.oneOf(data.healthStatus, ['Excellent', 'Good', 'Fair', 'Needs Medical Attention'], 'healthStatus');

  validator.maxLength(data.description, 500, 'description', 'Description must be 500 characters or less');

  return {
    isValid: validator.isValid(),
    errors: validator.getErrors()
  };
}

// Adopter form validation
export function validateAdopterForm(data) {
  const validator = new Validator();

  validator.required(data.name, 'name', 'Full name is required');
  validator.maxLength(data.name, 100, 'name', 'Name must be 100 characters or less');

  validator.required(data.email, 'email', 'Email address is required');
  validator.email(data.email, 'email');

  validator.required(data.phone, 'phone', 'Phone number is required');
  validator.phone(data.phone, 'phone');

  validator.required(data.address, 'address', 'Address is required');
  validator.maxLength(data.address, 200, 'address', 'Address must be 200 characters or less');

  return {
    isValid: validator.isValid(),
    errors: validator.getErrors()
  };
}

// Adoption request form validation
export function validateAdoptionRequestForm(data) {
  const validator = new Validator();

  validator.required(data.reason, 'reason', 'Please explain why you want to adopt this pet');
  validator.minLength(data.reason, 50, 'reason', 'Please provide at least 50 characters explaining your reason');
  validator.maxLength(data.reason, 1000, 'reason', 'Reason must be 1000 characters or less');

  validator.required(data.experience, 'experience', 'Please describe your pet experience');
  validator.minLength(data.experience, 20, 'experience', 'Please provide at least 20 characters about your experience');
  validator.maxLength(data.experience, 500, 'experience', 'Experience description must be 500 characters or less');

  validator.required(data.livingSpace, 'livingSpace', 'Please select your living space type');
  validator.oneOf(data.livingSpace, ['Apartment', 'House with Yard', 'House without Yard', 'Farm/Rural'], 'livingSpace');

  validator.required(data.workSchedule, 'workSchedule', 'Please select your work schedule');
  validator.oneOf(data.workSchedule, ['Work from Home', 'Part-time', 'Full-time', 'Retired', 'Student'], 'workSchedule');

  validator.maxLength(data.otherPets, 300, 'otherPets', 'Other pets description must be 300 characters or less');

  return {
    isValid: validator.isValid(),
    errors: validator.getErrors()
  };
}

// Login form validation
export function validateLoginForm(data) {
  const validator = new Validator();

  validator.required(data.email, 'email', 'Email address is required');
  validator.email(data.email, 'email');

  validator.required(data.password, 'password', 'Password is required');

  return {
    isValid: validator.isValid(),
    errors: validator.getErrors()
  };
}

// Registration form validation
export function validateRegistrationForm(data) {
  const validator = new Validator();

  validator.required(data.name, 'name', 'Full name is required');
  validator.maxLength(data.name, 100, 'name', 'Name must be 100 characters or less');

  validator.required(data.email, 'email', 'Email address is required');
  validator.email(data.email, 'email');

  validator.required(data.password, 'password', 'Password is required');
  validator.minLength(data.password, 8, 'password', 'Password must be at least 8 characters long');

  validator.required(data.confirmPassword, 'confirmPassword', 'Please confirm your password');
  if (data.password !== data.confirmPassword) {
    validator.addError('confirmPassword', 'Passwords do not match');
  }

  validator.required(data.phone, 'phone', 'Phone number is required');
  validator.phone(data.phone, 'phone');

  validator.required(data.address, 'address', 'Address is required');
  validator.maxLength(data.address, 200, 'address', 'Address must be 200 characters or less');

  return {
    isValid: validator.isValid(),
    errors: validator.getErrors()
  };
}

// File upload validation
export function validateFileUpload(file) {
  const validator = new Validator();
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (!file) {
    validator.addError('file', 'Please select a file');
    return {
      isValid: validator.isValid(),
      errors: validator.getErrors()
    };
  }

  if (file.size > maxSize) {
    validator.addError('file', 'File size must be less than 5MB');
  }

  if (!allowedTypes.includes(file.type)) {
    validator.addError('file', 'Only image files (JPEG, PNG, GIF, WebP) are allowed');
  }

  return {
    isValid: validator.isValid(),
    errors: validator.getErrors()
  };
}

// Generic form validation helper
export function validateForm(data, rules) {
  const validator = new Validator();

  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = data[field];

    fieldRules.forEach(rule => {
      switch (rule.type) {
        case 'required':
          validator.required(value, field, rule.message);
          break;
        case 'email':
          validator.email(value, field, rule.message);
          break;
        case 'phone':
          validator.phone(value, field, rule.message);
          break;
        case 'minLength':
          validator.minLength(value, rule.value, field, rule.message);
          break;
        case 'maxLength':
          validator.maxLength(value, rule.value, field, rule.message);
          break;
        case 'numberRange':
          validator.numberRange(value, rule.min, rule.max, field, rule.message);
          break;
        case 'oneOf':
          validator.oneOf(value, rule.options, field, rule.message);
          break;
      }
    });
  });

  return {
    isValid: validator.isValid(),
    errors: validator.getErrors()
  };
}
