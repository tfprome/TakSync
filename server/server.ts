import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from './routes'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/',router)

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {console.log("✅ MongoDB connected");    console.log("Connected DB:", mongoose.connection.name);})
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
