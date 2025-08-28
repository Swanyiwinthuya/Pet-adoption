import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import User from '../../../../lib/models/User';

// GET /api/users/[id] - Get a specific user by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    const user = await User.findById(id, { password: 0 }).lean();
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user });
    
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update a specific user
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();
    
    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if email is being changed and if it's already taken
    if (body.email && body.email !== existingUser.email) {
      const emailExists = await User.findOne({ email: body.email.toLowerCase() });
      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        );
      }
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );
    
    // Return user without password
    const userResponse = updatedUser.toObject();
    delete userResponse.password;
    
    return NextResponse.json({
      message: 'User updated successfully',
      user: userResponse
    });
    
  } catch (error) {
    console.error('Error updating user:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete a specific user
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Delete user
    await User.findByIdAndDelete(id);
    
    return NextResponse.json({
      message: 'User deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
