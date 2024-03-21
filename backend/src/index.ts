import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import {v2 as cloudinary} from 'cloudinary';
import myHotelRoutes from "./routes/my-hotels"

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
//.then(() => 
//console.log("connected to database: ", process.env.MONGODB_CONNECTION_STRING)); //**in console log it exposes ur mongodb url with password



const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes)

//app.get("/api/test", async (req: Request, res: Response) => {
//res.json({ message: " well i did the testing thing correctly" });
//}); .. testing the api (if it is running correctly or not)

app.listen(7000, () => {
  console.log("server is running on localhost:7000");
});
