import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import User from '../../../lib/models/User';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 25;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({}, { password: 0 })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const required = ['email', 'password', 'name', 'phone'];
    for (const f of required) {
      if (!body[f]) {
        return NextResponse.json({ error: `Missing required field: ${f}` }, { status: 400 });
      }
    }

    const existing = await User.findOne({ email: body.email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    // role handling
    let role = 'user';
    if (body.role === 'admin') {
      const code = body.adminCode?.toString().trim();
      if (!code || code !== process.env.ADMIN_SIGNUP_CODE) {
        return NextResponse.json({ error: 'Invalid admin signup code' }, { status: 403 });
      }
      role = 'admin';
    }

    const user = new User({
      email: body.email.toLowerCase(),
      password: body.password,
      name: body.name,
      phone: body.phone,
      photo: body.photo || null,
      role,
    });

    await user.save();
    const u = user.toObject();
    delete u.password;

    return NextResponse.json({ message: 'User created', user: u }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: 'Validation error', details: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
