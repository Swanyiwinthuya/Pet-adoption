import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Pet from '../../../lib/models/Pet';

// GET /api/pets - Get all pets with optional filtering
export async function GET(request) {

  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 25;
    const animal = searchParams.get('animal');
    const breed = searchParams.get('breed');
    const age = searchParams.get('age');
    
    // Build filter object
    const filter = {};
    
    if (animal) filter.animal = animal;
    if (breed) filter.breed = { $regex: breed, $options: 'i' };
    if (age) {
      const ageNum = parseInt(age);
      if (ageNum === 0) {
        filter.age = { $lt: 1 };
      } else {
        filter.age = ageNum;
      }
    }
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Execute query with pagination
    const [pets, totalCount] = await Promise.all([
      Pet.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Pet.countDocuments(filter)
    ]);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    return NextResponse.json({
      pets,
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
    console.error('Error fetching pets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pets' },
      { status: 500 }
    );
  }
}

// POST /api/pets - Create a new pet
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'animal', 'breed', 'age', 'medicalCondition'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Validate animal type
    const validAnimals = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'other'];
    if (!validAnimals.includes(body.animal)) {
      return NextResponse.json(
        { error: 'Invalid animal type' },
        { status: 400 }
      );
    }
    
    // Validate age
    if (body.age < 0 || body.age > 30) {
      return NextResponse.json(
        { error: 'Age must be between 0 and 30' },
        { status: 400 }
      );
    }
    
    // Create new pet
    const pet = new Pet(body);
    await pet.save();
    
    return NextResponse.json(
      { message: 'Pet created successfully', pet },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating pet:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create pet' },
      { status: 500 }
    );
  }
}

