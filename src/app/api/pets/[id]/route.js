import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Pet from '../../../../lib/models/Pet';

// GET /api/pets/[id] - Get a specific pet by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params; 
    
    const pet = await Pet.findById(id).lean();
    
    if (!pet) {
      return NextResponse.json(
        { error: 'Pet not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ pet });
    
  } catch (error) {
    console.error('Error fetching pet:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pet' },
      { status: 500 }
    );
  }
}

// PUT /api/pets/[id] - Update a specific pet
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params; 
    const body = await request.json();
    
    // Check if pet exists
    const existingPet = await Pet.findById(id);
    if (!existingPet) {
      return NextResponse.json(
        { error: 'Pet not found' },
        { status: 404 }
      );
    }
    
    // Validate animal type if provided
    if (body.animal) {
      const validAnimals = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'other'];
      if (!validAnimals.includes(body.animal)) {
        return NextResponse.json(
          { error: 'Invalid animal type' },
          { status: 400 }
        );
      }
    }
    
    // Validate age if provided
    if (body.age !== undefined) {
      if (body.age < 0 || body.age > 30) {
        return NextResponse.json(
          { error: 'Age must be between 0 and 30' },
          { status: 400 }
        );
      }
    }
    
    // Update pet
    const updatedPet = await Pet.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    ).lean();
    
    return NextResponse.json({
      message: 'Pet updated successfully',
      pet: updatedPet
    });
    
  } catch (error) {
    console.error('Error updating pet:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update pet' },
      { status: 500 }
    );
  }
}

// DELETE /api/pets/[id] - Delete a specific pet
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params; 
    
    // Check if pet exists
    const existingPet = await Pet.findById(id);
    if (!existingPet) {
      return NextResponse.json(
        { error: 'Pet not found' },
        { status: 404 }
      );
    }
    
    // Delete pet
    await Pet.findByIdAndDelete(id);
    
    return NextResponse.json({
      message: 'Pet deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting pet:', error);
    return NextResponse.json(
      { error: 'Failed to delete pet' },
      { status: 500 }
    );
  }
}
