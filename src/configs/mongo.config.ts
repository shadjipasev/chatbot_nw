import mongoose from "mongoose";
import { InternalServerError } from "restify-errors";

const connectMongo = async () => {
  try {
    await mongoose.connect(
      (process.env.MONGO_URI as string) || "mongodb://mongodb:27017/chatbot-nw"
    );
    console.log("MongoDB connected");
  } catch (error) {
    throw new InternalServerError({
      message: "MongoDB connection error",
      cause: error,
    });
  }
};

export default connectMongo;
