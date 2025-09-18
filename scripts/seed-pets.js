#!/usr/bin/env node

/**
 * Pet Database Seeding Script
 * 
 * This script imports the sample pet data into MongoDB using Mongoose.
 * Run with: node scripts/seed-pets.js
 */

import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the Pet model
import Pet from '../src/lib/models/Pet.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function seedPets() {
  try {
    console.log('🚀 Starting pet database seeding...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pet_adoption';
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB successfully!');
    
    // Load sample data
    const sampleDataPath = path.join(__dirname, '../sample_pet_data.json');
    if (!fs.existsSync(sampleDataPath)) {
      throw new Error('Sample data file not found: ' + sampleDataPath);
    }
    
    const sampleData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));
    console.log(`📄 Loaded ${sampleData.length} pets from sample data`);
    
    // Check if pets already exist
    const existingCount = await Pet.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing pets in database`);
      console.log('🗑️  Clearing existing pets...');
      await Pet.deleteMany({});
      console.log('✅ Existing pets cleared');
    }
    
    // Add timestamps to each pet
    const petsWithTimestamps = sampleData.map(pet => ({
      ...pet,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Insert pets
    console.log('💾 Inserting pets into database...');
    const insertedPets = await Pet.insertMany(petsWithTimestamps);
    console.log(`✅ Successfully inserted ${insertedPets.length} pets!`);
    
    // Generate statistics
    console.log('\n📊 Database Statistics:');
    const stats = await Pet.aggregate([
      {
        $group: {
          _id: '$animal',
          count: { $sum: 1 },
          avgAge: { $avg: '$age' }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} pets (avg age: ${stat.avgAge.toFixed(1)} years)`);
    });
    
    // Show some sample pets
    console.log('\n🐾 Sample pets in database:');
    const samplePets = await Pet.find().limit(5).select('name animal breed age');
    samplePets.forEach(pet => {
      console.log(`   ${pet.name} - ${pet.breed} ${pet.animal} (${pet.age} years old)`);
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('   1. Start your Next.js development server: npm run dev');
    console.log('   2. Visit http://localhost:3000/pets to see the imported pets');
    console.log('   3. Test the API endpoints at http://localhost:3000/api/pets');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    if (error.name === 'ValidationError') {
      console.error('📋 Validation details:', error.errors);
    }
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Handle script termination
process.on('SIGINT', async () => {
  console.log('\n⏹️  Script interrupted, cleaning up...');
  await mongoose.disconnect();
  process.exit(0);
});

// Run the seeding function
if (import.meta.url === `file://${process.argv[1]}`) {
  seedPets();
}

export default seedPets;