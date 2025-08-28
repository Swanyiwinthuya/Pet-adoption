import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
<<<<<<< HEAD
import User from '../../../lib/models/User';

// POST /api/admin - Create a new admin user
=======
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
>>>>>>> origin/arkar
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
<<<<<<< HEAD
    const requiredFields = ['email', 'password', 'name', 'phone'];
=======
    const requiredFields = ['email', 'password'];
>>>>>>> origin/arkar
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
<<<<<<< HEAD
    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
=======
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: body.email.toLowerCase() });
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin with this email already exists' },
>>>>>>> origin/arkar
        { status: 409 }
      );
    }
    
<<<<<<< HEAD
    // Create new admin user
    const admin = new User({
      email: body.email.toLowerCase(),
      password: body.password,
      name: body.name,
      phone: body.phone,
      photo: body.photo || null,
      role: 'admin' // Set role as admin
=======
    // Create new admin
    const admin = new Admin({
      email: body.email.toLowerCase(),
      password: body.password
>>>>>>> origin/arkar
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
<<<<<<< HEAD

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
=======
>>>>>>> origin/arkar
