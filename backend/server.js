import cors from "cors";
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

const corsOptions = {
  origin: [
    "https://url-shortify.vercel.app",
    "https://urlshortify.site",
    "https://www.urlshortify.site",
  ],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notfound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running port ${port}`));
