import mongoose from "mongoose";

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected successfully");
})

const connectMongoDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/forever`)
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure

    }
}

export default connectMongoDB;
// This function connects to MongoDB using Mongoose and logs the connection status.