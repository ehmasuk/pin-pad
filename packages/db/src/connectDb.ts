
// packages/db/src/connectDb.ts
import mongoose, { Mongoose } from "mongoose";

type Cached = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// global cache (important for serverless & hot reload)
let cached: Cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDb(
  mongoUrl: string,
  dbName: string
): Promise<Mongoose> {
  if (!mongoUrl) {
    throw new Error("MongoDB URL is required");
  }

  if (!dbName) {
    throw new Error("Database name is required");
  }

  // already connected
  if (cached.conn) {
    return cached.conn;
  }

  // create connection once
  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUrl, {
      dbName,
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

