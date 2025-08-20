import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL environment variable is not set");
    }
    
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });
    
    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err.message);
    });
    
    await mongoose.connect(`${process.env.MONGODB_URL}/car-rental`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};
export default connectDB;
