import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import shipmentRoutes from "./routes/shipment";

// ✅ Load environment variables
dotenv.config();

const app: Application = express();

// ✅ Enable CORS globally
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => console.log("Mongoose: connected"));
mongoose.connection.on("error", (err) => console.error("Mongoose error:", err));
mongoose.connection.on("disconnected", () => console.log("Mongoose: disconnected"));

connectDB();

// ✅ Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Shipment API is running 🚚",
    baseUrl: process.env.RENDER_EXTERNAL_URL || "http://localhost:5000",
  });
});

// ✅ API routes
app.use("/api/shipments", shipmentRoutes);

// ✅ Optional: Serve frontend SPA if you have a dist folder
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const baseUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  console.log(`🚀 Server running at: ${baseUrl}`);
});
