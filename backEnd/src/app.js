import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import healthRoutes from "./routes/health.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173"
}));

app.use(express.json({
    limit: "1mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "1mb"
}));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false
});

app.use("/api", apiLimiter);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to PayX Payment Gateway API"
    });
});

app.use("/api/v1", healthRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

app.use(errorMiddleware);

export default app;