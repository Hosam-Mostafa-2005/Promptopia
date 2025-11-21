import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sharePrompt", // ✅ بدون مسافة
    });

    isConnected = true;
    console.log("MongoDB is now connected ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
