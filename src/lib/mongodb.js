import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri || !(uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'))) {
  throw new Error(
    'MONGODB_URI missing or invalid. It must start with "mongodb://" or "mongodb+srv://". ' +
    'Set it in .env.local at project root.'
  );
}

const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
