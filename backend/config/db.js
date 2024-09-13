import { ENV_VARS } from "./envVars.js";
import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("'MongoDB Connected: " + con.connection.host)

    } catch (error) {
        console.error(error.message);
        process.exit(1);

    }
}