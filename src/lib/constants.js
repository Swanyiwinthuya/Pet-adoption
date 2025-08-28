// Application constants for Pet Adoption Management System

// Pet species options
export const PET_SPECIES = [
  { value: 'Dog', label: 'Dog' },
  { value: 'Cat', label: 'Cat' },
  { value: 'Bird', label: 'Bird' },
  { value: 'Rabbit', label: 'Rabbit' },
  { value: 'Fish', label: 'Fish' },
  { value: 'Hamster', label: 'Hamster' },
  { value: 'Guinea Pig', label: 'Guinea Pig' },
  { value: 'Other', label: 'Other' },
];

// Health status options
export const HEALTH_STATUS = [
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
  { value: 'Needs Medical Attention', label: 'Needs Medical Attention' },
];

// Adoption request status
export const REQUEST_STATUS = [
  { value: 'Pending', label: 'Pending', color: 'warning' },
  { value: 'Approved', label: 'Approved', color: 'success' },
  { value: 'Rejected', label: 'Rejected', color: 'danger' },
];

// User roles
export const USER_ROLES = [
  { value: 'adopter', label: 'Adopter' },
  { value: 'admin', label: 'Administrator' },
  { value: 'staff', label: 'Staff' },
];

// Age ranges for filtering
export const AGE_RANGES = [
  { value: '0-1', label: 'Puppy/Kitten (0-1 years)' },
  { value: '1-3', label: 'Young (1-3 years)' },
  { value: '3-7', label: 'Adult (3-7 years)' },
  { value: '7+', label: 'Senior (7+ years)' },
];

// Living space options
export const LIVING_SPACES = [
  { value: 'Apartment', label: 'Apartment' },
  { value: 'House with Yard', label: 'House with Yard' },
  { value: 'House without Yard', label: 'House without Yard' },
  { value: 'Farm/Rural', label: 'Farm/Rural Property' },
];

// Work schedule options
export const WORK_SCHEDULES = [
  { value: 'Work from Home', label: 'Work from Home' },
  { value: 'Part-time', label: 'Part-time (20-30 hours/week)' },
  { value: 'Full-time', label: 'Full-time (40+ hours/week)' },
  { value: 'Retired', label: 'Retired' },
  { value: 'Student', label: 'Student' },
  { value: 'Unemployed', label: 'Unemployed' },
];

// Date range filters
export const DATE_RANGES = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' },
];

// Pagination options
export const ITEMS_PER_PAGE_OPTIONS = [
  { value: 10, label: '10 per page' },
  { value: 25, label: '25 per page' },
  { value: 50, label: '50 per page' },
  { value: 100, label: '100 per page' },
];

// Default pagination
export const DEFAULT_PAGE_SIZE = 25;

// API endpoints
export const API_ENDPOINTS = {
  PETS: '/pets',
  ADOPTERS: '/adopters',
  REQUESTS: '/requests',
  AUTH: '/auth',
  UPLOAD: '/upload',
};

// File upload constraints
export const UPLOAD_CONSTRAINTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  MAX_FILES: 5,
};

// Navigation menu items
export const ADMIN_MENU_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/admin',
    icon: '📊',
  },
  {
    id: 'pets',
    label: 'Pet Management',
    href: '/admin/pets',
    icon: '🐕',
  },
  {
    id: 'adopters',
    label: 'Adopter Management',
    href: '/admin/adopters',
    icon: '👥',
  },
  {
    id: 'requests',
    label: 'Adoption Requests',
    href: '/admin/requests',
    icon: '📋',
  },
];

export const PUBLIC_MENU_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    id: 'pets',
    label: 'Find Pets',
    href: '/pets',
  },
  {
    id: 'about',
    label: 'About Us',
    href: '/about',
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
  },
];

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PHONE_INVALID: 'Please enter a valid phone number',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters long',
  PASSWORD_MISMATCH: 'Passwords do not match',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  FILE_TYPE_INVALID: 'Only image files are allowed',
};

// Toast notification types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'pet_adoption_auth',
  USER_PREFERENCES: 'pet_adoption_preferences',
  THEME: 'pet_adoption_theme',
};

// Theme options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};
