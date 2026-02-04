// packages/db/src/connectDb.ts
import mongoose from "mongoose";
// global cache (important for serverless & hot reload)
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}
export async function connectDb(mongoUrl, dbName) {
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
