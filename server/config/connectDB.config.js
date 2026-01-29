import mongoose from "mongoose";

const connectDB = async () => {
    const mongodbUrl = process.env.MONGODB
    try {
        await mongoose.connect(mongodbUrl)
        console.log("🟢 MongoDB Connected")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default connectDB;