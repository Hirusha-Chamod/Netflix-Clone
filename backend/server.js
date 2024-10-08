import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import authRoutes from "./routes/authRoute.js"
import express from "express"



const app = express();
const PORT = ENV_VARS.PORT

app.use(express.json())

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
    console.log("Server started at port " + PORT);
    connectDB();
})
