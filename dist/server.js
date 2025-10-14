"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const shipment_1 = __importDefault(require("./routes/shipment"));
// ✅ Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// ✅ Enable CORS (Universal Access + Preflight Handling)
app.use((0, cors_1.default)({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// ✅ Handle all preflight OPTIONS requests
app.options("*", (0, cors_1.default)());
// ✅ Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ✅ MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB connected successfully");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
// ✅ Mongoose event listeners
mongoose_1.default.connection.on("connected", () => console.log("Mongoose: connected"));
mongoose_1.default.connection.on("error", (err) => console.error("Mongoose error:", err));
mongoose_1.default.connection.on("disconnected", () => console.log("Mongoose: disconnected"));
// ✅ Connect to database
connectDB();
// ✅ Default Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Shipment API is running 🚚",
        baseUrl: process.env.RENDER_EXTERNAL_URL || "http://localhost:5000",
    });
});
// ✅ API Routes
app.use("/api/shipments", shipment_1.default);
// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    const baseUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
    console.log(`🚀 Server running at: ${baseUrl}`);
});
