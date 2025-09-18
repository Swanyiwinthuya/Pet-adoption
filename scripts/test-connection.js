#!/usr/bin/env node

/**
 * MongoDB Connection Test Script
 * 
 * This script tests the MongoDB connection before seeding data.
 * Run with: node scripts/test-connection.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pet_adoption';
    console.log('📡 Connecting to:', mongoUri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    // Connect with timeout
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });
    
    console.log('✅ MongoDB connection successful!');
    
    // Test database operations
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`📊 Database: ${db.databaseName}`);
    console.log(`📁 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('   Collections:');
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }
    
    // Check if pets collection exists and count documents
    const petsCollection = db.collection('pets');
    const petCount = await petsCollection.countDocuments();
    console.log(`🐾 Pets in database: ${petCount}`);
    
    console.log('\n🎉 Connection test completed successfully!');
    console.log('\n💡 Ready to seed database with: npm run seed');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    
    if (error.name === 'MongoServerSelectionError') {
      console.error('\n🔧 Troubleshooting tips:');
      console.error('   1. Make sure MongoDB is running');
      console.error('   2. Check your MONGODB_URI in .env.local');
      console.error('   3. Verify network connectivity');
      console.error('   4. Check firewall settings');
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Handle script termination
process.on('SIGINT', async () => {
  console.log('\n⏹️  Script interrupted, cleaning up...');
  await mongoose.disconnect();
  process.exit(0);
});

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  testConnection();
}

export default testConnection;