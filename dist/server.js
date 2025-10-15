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
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// ✅ Enable CORS
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you ever send cookies/auth headers
}));
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
// Mongoose connection events
mongoose_1.default.connection.on("connected", () => {
    console.log("Mongoose event: connected");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error("Mongoose event: connection error", err);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("Mongoose event: disconnected");
});
// Connect to database
connectDB();
// Default route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Shipment API is running 🚚" });
});
// Routes
app.use("/api/shipments", shipment_1.default);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
