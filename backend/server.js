import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import authRoutes from "./routes/authRoute.js"
import express from "express"
import cookieParser from "cookie-parser"
import movieRoutes from "./routes/movieRoutes.js"
import tvRoutes from "./routes/tvRoutes.js"
import { protectRoute } from "./middlewear/protectRoute.js";
import searchRoutes from "./routes/searchRoutes.js"



const app = express();
const PORT = ENV_VARS.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

app.listen(PORT, () => {
    console.log("Server started at port " + PORT);
    connectDB();
})

