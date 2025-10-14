import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import shipmentRoutes from "./routes/shipment";

// ✅ Load environment variables
dotenv.config();

const app: Application = express();

// ✅ Enable CORS (Universal Access + Preflight Handling)
app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle all preflight OPTIONS requests
app.options("*", cors());

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// ✅ Mongoose event listeners
mongoose.connection.on("connected", () => console.log("Mongoose: connected"));
mongoose.connection.on("error", (err) => console.error("Mongoose error:", err));
mongoose.connection.on("disconnected", () => console.log("Mongoose: disconnected"));

// ✅ Connect to database
connectDB();

// ✅ Default Route
app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: "Shipment API is running 🚚",
    baseUrl: process.env.RENDER_EXTERNAL_URL || "http://localhost:5000",
  });
});

// ✅ API Routes
app.use("/api/shipments", shipmentRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (): void => {
  const baseUrl =
    process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  console.log(`🚀 Server running at: ${baseUrl}`);
});
