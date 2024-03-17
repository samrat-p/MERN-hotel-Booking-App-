import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connected successfully");
}); //mongodb connection status

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
//backend didnt allow the request come form our frontend, adds httponly cookie, can be only accesed by the server, whatever we write code on the browser, we can not access the cookie from the browser, which is pretty secure.
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//app.get("/api/test", async (req: Request, res: Response) => {
//res.json({ message: " well i did the testing thing correctly" });
//}); .. testing the api (if it is running correctly or not)

app.listen(7000, () => {
  console.log("server is running on localhost:7000");
});
