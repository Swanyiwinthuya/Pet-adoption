import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import AdoptionRequest from '../../../../lib/models/AdoptionRequest';

// GET /api/requests/[id] - Get a specific adoption request by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    const adoptionRequest = await AdoptionRequest.findById(id)
      .populate('pet', 'name animal breed age medicalCondition')
      .lean();
    
    if (!adoptionRequest) {
      return NextResponse.json(
        { error: 'Adoption request not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ request: adoptionRequest });
    
  } catch (error) {
    console.error('Error fetching adoption request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch adoption request' },
      { status: 500 }
    );
  }
}

// PUT /api/requests/[id] - Update a specific adoption request
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();
    
    // Check if adoption request exists
    const existingRequest = await AdoptionRequest.findById(id);
    if (!existingRequest) {
      return NextResponse.json(
        { error: 'Adoption request not found' },
        { status: 404 }
      );
    }
    
    // Validate pickup date if provided
    if (body.pickupDate) {
      const pickupDate = new Date(body.pickupDate);
      if (pickupDate <= new Date()) {
        return NextResponse.json(
          { error: 'Pickup date must be in the future' },
          { status: 400 }
        );
      }
    }
    
    // Validate responsibility acceptance if provided
    if (body.responsibilityAccepted === false) {
      return NextResponse.json(
        { error: 'You must accept responsibility for adopting the pet' },
        { status: 400 }
      );
    }
    
    // Update adoption request
    const updatedRequest = await AdoptionRequest.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );
    
    // Populate pet details for response
    await updatedRequest.populate('pet', 'name animal breed age medicalCondition');
    
    return NextResponse.json({
      message: 'Adoption request updated successfully',
      request: updatedRequest
    });
    
  } catch (error) {
    console.error('Error updating adoption request:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update adoption request' },
      { status: 500 }
    );
  }
}

// DELETE /api/requests/[id] - Delete a specific adoption request
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Check if adoption request exists
    const existingRequest = await AdoptionRequest.findById(id);
    if (!existingRequest) {
      return NextResponse.json(
        { error: 'Adoption request not found' },
        { status: 404 }
      );
    }
    
    // Delete adoption request
    await AdoptionRequest.findByIdAndDelete(id);
    
    return NextResponse.json({
      message: 'Adoption request deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting adoption request:', error);
    return NextResponse.json(
      { error: 'Failed to delete adoption request' },
      { status: 500 }
    );
  }
}
