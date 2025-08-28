import clientPromise from './mongodb';
import mongoose from 'mongoose';

// TODO: Replace with environment variable later
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://socalledjamesakp_db_user:akp12345@cluster0.kzzglid.mongodb.net/pet-adoption?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB using Mongoose
export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected');
      return mongoose.connection;
    }

    const conn = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority'
    });

    console.log('MongoDB connected successfully to Atlas');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Get database instance
export async function getDB() {
  try {
    const client = await clientPromise;
    return client.db();
  } catch (error) {
    console.error('Failed to get database:', error);
    throw error;
  }
}

// Get collection
export async function getCollection(collectionName) {
  try {
    const db = await getDB();
    return db.collection(collectionName);
  } catch (error) {
    console.error(`Failed to get collection ${collectionName}:`, error);
    throw error;
  }
}

// Health check for database
export async function checkDBHealth() {
  try {
    const client = await clientPromise;
    await client.db().admin().ping();
    return { status: 'healthy', message: 'Database connection is working' };
  } catch (error) {
    return { status: 'unhealthy', message: error.message };
  }
}

// Close database connection
export async function closeDB() {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

// Database initialization
export async function initDB() {
  try {
    await connectDB();
    
    // Create indexes for better performance
    const db = await getDB();
    
    // Create indexes for pets collection
    await db.collection('pets').createIndexes([
      { key: { animal: 1 } },
      { key: { breed: 1 } },
      { key: { age: 1 } },
      { key: { createdAt: -1 } }
    ]);
    
    // Create indexes for users collection
    await db.collection('users').createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { createdAt: -1 } }
    ]);
    
    // Create indexes for adoption requests collection
    await db.collection('adoptionrequests').createIndexes([
      { key: { pet: 1 } },
      { key: { pickupDate: 1 } },
      { key: { createdAt: -1 } }
    ]);
    
    console.log('Database indexes created successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Seed database with sample data
export async function seedDB() {
  try {
    const db = await getDB();
    
    // Check if data already exists
    const petsCount = await db.collection('pets').countDocuments();
    if (petsCount > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }
    
    // Sample pets data
    const samplePets = [
      {
        name: 'Max',
        animal: 'dog',
        breed: 'Golden Retriever',
        age: 2,
        medicalCondition: 'Healthy, fully vaccinated',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Luna',
        animal: 'cat',
        breed: 'Domestic Shorthair',
        age: 1,
        medicalCondition: 'Healthy, spayed, needs regular checkups',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Insert sample pets
    await db.collection('pets').insertMany(samplePets);
    
    console.log('Database seeded with sample data');
    return true;
  } catch (error) {
    console.error('Database seeding failed:', error);
    throw error;
  }
}

