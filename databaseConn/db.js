import mongoose from "mongoose";
import color from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb databse ${conn.connection.host}` .bgGreen.white);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;