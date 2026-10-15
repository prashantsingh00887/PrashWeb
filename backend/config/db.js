import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://prashantsingh00887_db_user:W8PwQ1XlbcmZMmYT@ac-aquqavm-shard-00-00.1egwvkp.mongodb.net:27017,ac-aquqavm-shard-00-01.1egwvkp.mongodb.net:27017,ac-aquqavm-shard-00-02.1egwvkp.mongodb.net:27017/prashweb?ssl=true&replicaSet=atlas-b2lkkq-shard-0&authSource=admin&compressors=zlib';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log(`[MongoDB Atlas] Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`[MongoDB Atlas] Connection Error: ${err.message}`);
    // Don't crash server; let app run with fallback
    return null;
  }
};

export const getDBStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return {
    state: states[mongoose.connection.readyState] || 'unknown',
    readyState: mongoose.connection.readyState,
  };
};
