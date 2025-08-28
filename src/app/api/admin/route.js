import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import User from '../../../lib/models/User';

// POST /api/admin - Create a new admin user
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['email', 'password', 'name', 'phone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Create new admin user
    const admin = new User({
      email: body.email.toLowerCase(),
      password: body.password,
      name: body.name,
      phone: body.phone,
      photo: body.photo || null,
      role: 'admin' // Set role as admin
    });
    
    await admin.save();
    
    // Return admin without password
    const adminResponse = admin.toObject();
    delete adminResponse.password;
    
    return NextResponse.json(
      { message: 'Admin created successfully', admin: adminResponse },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating admin:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}

// GET /api/admin - Get all admins (for super admin use)
export async function GET(request) {
  try {
    await connectDB();
    
    const admins = await User.find({ role: 'admin' }, { password: 0 })
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json({ admins });
    
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admins' },
      { status: 500 }
    );
  }
}
