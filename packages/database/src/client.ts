import mongoose from "mongoose";

export const connectDb = async (url: string, dbName: string): Promise<typeof mongoose> => {
  const connection = await mongoose.connect(url, {
    dbName: dbName,
  });
  return connection;
};
