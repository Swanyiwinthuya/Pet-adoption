import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Admin from '../../../lib/models/Admin';

// GET /api/admin - Get all admins (for super admin use)
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 25;
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Execute query with pagination
    const [admins, totalCount] = await Promise.all([
      Admin.find({}, { password: 0 }) // Exclude passwords
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Admin.countDocuments()
    ]);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    return NextResponse.json({
      admins,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
    
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admins' },
      { status: 500 }
    );
  }
}

// POST /api/admin - Create a new admin account
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['email', 'password'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: body.email.toLowerCase() });
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin with this email already exists' },
        { status: 409 }
      );
    }
    
    // Create new admin
    const admin = new Admin({
      email: body.email.toLowerCase(),
      password: body.password
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
