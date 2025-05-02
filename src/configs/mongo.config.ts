import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(
      (process.env.MONGO_URI as string) || "mongodb://mongodb:27017/chatbot-nw"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongo;
