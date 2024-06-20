import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomTypesRoute from "./routes/roomTypes.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();

const MONGO_URL = 'mongodb://mongo_server:27017/hotel-db' || 'mongodb://localhost:27017/hotel-db';

const connect = async () => {
  try {
    await mongoose.connect('mongodb://mongo_server:27017/hotel-db');
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
})

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
})

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/roomTypes", roomTypesRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(5001, () => {
  connect()
  console.log("Connected to backend.");
});