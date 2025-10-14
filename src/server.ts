import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import shipmentRoutes from "./routes/shipment";

// Load environment variables
dotenv.config();

const app: Application = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local frontend (dev)
      "https://shipment-app.onrender.com" // Deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you ever send cookies/auth headers
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Mongoose connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose event: connected");
});
mongoose.connection.on("error", (err) => {
  console.error("Mongoose event: connection error", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose event: disconnected");
});

// Connect to database
connectDB();

// Default route
app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ message: "Shipment API is running 🚚" });
});

// Routes
app.use("/api/shipments", shipmentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (): void => {
  console.log(`Server running at http://localhost:${PORT}`);
});
