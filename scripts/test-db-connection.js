import { connectDB, checkDBHealth, seedDB } from '../src/lib/db.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('🔌 Testing MongoDB Atlas connection...');
    
    // Test basic connection
    await connectDB();
    console.log('✅ Basic connection successful');
    
    // Test health check
    const health = await checkDBHealth();
    console.log('🏥 Health check:', health);
    
    // Test seeding (optional)
    console.log('🌱 Testing database seeding...');
    await seedDB();
    console.log('✅ Database seeding successful');
    
    console.log('🎉 All tests passed! Your MongoDB Atlas connection is working.');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('Please check your MONGODB_URI in .env.local file');
    process.exit(1);
  }
}

// Run the test
testConnection();
