# MongoDB Import Guide for Pet Data

## Overview
This guide explains how to import and use the sample pet data (`sample_pet_data.json`) in MongoDB for the pet adoption application.

## Prerequisites
- MongoDB installed and running
- MongoDB connection configured in `.env.local`
- Sample data file: `sample_pet_data.json`

## Method 1: Using MongoDB Compass (GUI)

1. **Open MongoDB Compass**
2. **Connect to your database** using your connection string
3. **Create/Select Database**: `pet_adoption`
4. **Create/Select Collection**: `pets`
5. **Import Data**:
   - Click "ADD DATA" → "Import JSON or CSV file"
   - Select `sample_pet_data.json`
   - Choose "JSON" format
   - Click "Import"

## Method 2: Using MongoDB Command Line (mongoimport)

```bash
# Basic import command
mongoimport --db pet_adoption --collection pets --file sample_pet_data.json --jsonArray

# With authentication (if required)
mongoimport --uri "mongodb://username:password@localhost:27017/pet_adoption" --collection pets --file sample_pet_data.json --jsonArray

# For MongoDB Atlas (cloud)
mongoimport --uri "mongodb+srv://username:password@cluster.mongodb.net/pet_adoption" --collection pets --file sample_pet_data.json --jsonArray
```

## Method 3: Using Node.js Script

Create a script to import data programmatically:

```javascript
// scripts/import-pets.js
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function importPets() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('pet_adoption');
    const collection = db.collection('pets');
    
    // Read sample data
    const sampleData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../sample_pet_data.json'), 'utf8')
    );
    
    // Add timestamps to each record
    const petsWithTimestamps = sampleData.map(pet => ({
      ...pet,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Insert data
    const result = await collection.insertMany(petsWithTimestamps);
    console.log(`Imported ${result.insertedCount} pets successfully!`);
    
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await client.close();
  }
}

importPets();
```

Run the script:
```bash
node scripts/import-pets.js
```

## Method 4: Using Mongoose (Recommended for this project)

```javascript
// scripts/seed-database.js
const mongoose = require('mongoose');
const Pet = require('../src/lib/models/Pet');
const sampleData = require('../sample_pet_data.json');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data (optional)
    await Pet.deleteMany({});
    console.log('Cleared existing pets');
    
    // Insert sample data
    const pets = await Pet.insertMany(sampleData);
    console.log(`Inserted ${pets.length} pets successfully!`);
    
    // Display some stats
    const stats = await Pet.aggregate([
      { $group: { _id: '$animal', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    console.log('Pet distribution:', stats);
    
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
```

## Verification Queries

After importing, verify the data with these MongoDB queries:

```javascript
// Count total pets
db.pets.countDocuments()

// Find all dogs
db.pets.find({ animal: "dog" })

// Find pets by age range
db.pets.find({ age: { $gte: 2, $lte: 4 } })

// Find healthy pets
db.pets.find({ medicalCondition: { $regex: "Healthy", $options: "i" } })

// Group by animal type
db.pets.aggregate([
  { $group: { _id: "$animal", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

## Using in Your Application

Once imported, your Next.js API routes can query this data:

```javascript
// src/app/api/pets/route.js
import { connectDB } from '@/lib/mongodb';
import Pet from '@/lib/models/Pet';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const animal = searchParams.get('animal');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    
    const query = animal ? { animal } : {};
    
    const pets = await Pet.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Pet.countDocuments(query);
    
    return Response.json({
      pets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch pets' }, { status: 500 });
  }
}
```

## Environment Configuration

Ensure your `.env.local` has the correct MongoDB connection:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/pet_adoption
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pet_adoption
```

## Troubleshooting

1. **Connection Issues**: Verify MongoDB is running and connection string is correct
2. **Import Errors**: Ensure JSON format is valid and `--jsonArray` flag is used
3. **Permission Issues**: Check database user permissions
4. **Schema Validation**: Ensure data matches the Pet model schema

## Next Steps

1. Import the sample data using your preferred method
2. Test API endpoints with the imported data
3. Verify the pet listing page displays the imported pets
4. Add more sample data as needed for testing

The sample data includes 20 diverse pets across different species (dogs, cats, birds, rabbits, fish, hamsters) with realistic medical conditions and breed information.