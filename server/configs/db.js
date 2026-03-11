import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        const uri = process.env.MONGODB_URI.endsWith('/') ? `${process.env.MONGODB_URI}car-rental` : `${process.env.MONGODB_URI}/car-rental`;
        await mongoose.connect(uri)
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;