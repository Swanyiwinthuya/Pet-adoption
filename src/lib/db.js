import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI || !(MONGODB_URI.startsWith('mongodb://') || MONGODB_URI.startsWith('mongodb+srv://'))) {
  throw new Error(
    'MONGODB_URI missing or invalid. It must start with "mongodb://" or "mongodb+srv://". ' +
    'Set it in .env.local at project root.'
  );
}

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        // You can add other mongoose opts here if you need
      })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
