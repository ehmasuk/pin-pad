import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export const connectDb = async (url: string, dbName: string): Promise<typeof mongoose> => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const connection = await mongoose.connect(url, {
    dbName: dbName,
    bufferCommands: false, // Return error immediately if connection is down
    serverSelectionTimeoutMS: 5000, // Fail quickly if no server found
    socketTimeoutMS: 45000, // Close sockets after inactivity
  });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB Cluster");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });

  cachedConnection = connection;
  return connection;
};
