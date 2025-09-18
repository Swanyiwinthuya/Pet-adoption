#!/usr/bin/env node

/**
 * Simple Pet Database Seeding Script
 * 
 * This script imports sample pet data using direct MongoDB connection.
 * Run with: node scripts/simple-seed.js
 */

import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

async function simpleSeed() {
  let client;
  
  try {
    console.log('🚀 Starting simple pet database seeding...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pet_adoption';
    console.log('📡 Connecting to MongoDB...');
    
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');
    
    // Get database and collection
    const db = client.db('pet-adoption');
    const collection = db.collection('pets');
    
    console.log(`📊 Using database: ${db.databaseName}`);
    console.log(`📁 Using collection: pets`);
    
    // Load sample data
    const sampleDataPath = path.join(__dirname, '../sample_pet_data.json');
    if (!fs.existsSync(sampleDataPath)) {
      throw new Error('Sample data file not found: ' + sampleDataPath);
    }
    
    const sampleData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));
    console.log(`📄 Loaded ${sampleData.length} pets from sample data`);
    
    // Check if pets already exist
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing pets in database`);
      console.log('🗑️  Clearing existing pets...');
      await collection.deleteMany({});
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
    const result = await collection.insertMany(petsWithTimestamps);
    console.log(`✅ Successfully inserted ${result.insertedCount} pets!`);
    
    // Generate statistics
    console.log('\n📊 Database Statistics:');
    const stats = await collection.aggregate([
      {
        $group: {
          _id: '$animal',
          count: { $sum: 1 },
          avgAge: { $avg: '$age' }
        }
      },
      { $sort: { count: -1 } }
    ]).toArray();
    
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} pets (avg age: ${stat.avgAge.toFixed(1)} years)`);
    });
    
    // Show some sample pets
    console.log('\n🐾 Sample pets in database:');
    const samplePets = await collection.find({}).limit(5).toArray();
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
    if (error.code) {
      console.error('Error code:', error.code);
    }
    process.exit(1);
  } finally {
    // Close database connection
    if (client) {
      await client.close();
      console.log('\n🔌 Disconnected from MongoDB');
    }
  }
}

// Handle script termination
process.on('SIGINT', async () => {
  console.log('\n⏹️  Script interrupted, cleaning up...');
  process.exit(0);
});

// Run the seeding function
if (import.meta.url === `file://${process.argv[1]}`) {
  simpleSeed();
}

export default simpleSeed;