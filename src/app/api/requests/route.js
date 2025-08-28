import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import AdoptionRequest from '../../../lib/models/AdoptionRequest';
import Pet from '../../../lib/models/Pet';

// GET /api/requests - Get all adoption requests
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 25;
    const petId = searchParams.get('pet');
    const userName = searchParams.get('userName');
    
    // Build filter object
    const filter = {};
    
    if (petId) filter.pet = petId;
    if (userName) filter.userName = { $regex: userName, $options: 'i' };
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Execute query with pagination and populate pet details
    const [requests, totalCount] = await Promise.all([
      AdoptionRequest.find(filter)
        .populate('pet', 'name animal breed age medicalCondition')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      AdoptionRequest.countDocuments(filter)
    ]);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    return NextResponse.json({
      requests,
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
    console.error('Error fetching adoption requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch adoption requests' },
      { status: 500 }
    );
  }
}

// POST /api/requests - Create a new adoption request
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['userName', 'phoneNumber', 'pet', 'pickupDate', 'message', 'responsibilityAccepted'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Validate responsibility acceptance
    if (!body.responsibilityAccepted) {
      return NextResponse.json(
        { error: 'You must accept responsibility for adopting the pet' },
        { status: 400 }
      );
    }
    
    // Validate pickup date (must be in the future)
    const pickupDate = new Date(body.pickupDate);
    if (pickupDate <= new Date()) {
      return NextResponse.json(
        { error: 'Pickup date must be in the future' },
        { status: 400 }
      );
    }
    
    // Check if pet exists
    const pet = await Pet.findById(body.pet);
    if (!pet) {
      return NextResponse.json(
        { error: 'Pet not found' },
        { status: 404 }
      );
    }
    
    // Create new adoption request
    const adoptionRequest = new AdoptionRequest({
      userName: body.userName,
      phoneNumber: body.phoneNumber,
      pet: body.pet,
      pickupDate: pickupDate,
      message: body.message,
      responsibilityAccepted: body.responsibilityAccepted
    });
    
    await adoptionRequest.save();
    
    // Populate pet details for response
    await adoptionRequest.populate('pet', 'name animal breed age medicalCondition');
    
    return NextResponse.json(
      { 
        message: 'Adoption request submitted successfully', 
        request: adoptionRequest 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating adoption request:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to submit adoption request' },
      { status: 500 }
    );
  }
}
