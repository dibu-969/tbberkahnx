import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('Mohon definisikan MONGODB_URL di .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('MongoDB: Menggunakan koneksi yang sudah di-cache.');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { 
      bufferCommands: false, 
      serverSelectionTimeoutMS: 5000,
    };
    
    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
      console.log('MongoDB: Koneksi baru berhasil dibuat.');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB: Gagal terhubung.', error);
    throw error;
  }

  return cached.conn;
}

export default dbConnect;