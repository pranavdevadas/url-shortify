import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notfound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notfound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running port ${port}`));
