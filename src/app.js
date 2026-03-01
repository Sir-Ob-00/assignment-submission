import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import {limiter} from "./middleware/ratelimit.middleware.js";
import {errorHandler} from "./middleware/error.middleware.js";
import {logger} from "./middleware/logger.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import assignmentRoutes from "./routes/assignment.routes.js";

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


//GLOBAL MIDDLEWARE

// Security headers
app.use(helmet());

// CORS configuration
app.use(
    cors({
        origin: "*", // change to your frontend URL in production
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Rate limiting
app.use(limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger
app.use(morgan("dev"));

// Custom logger middleware (if using winston inside)
app.use(logger);

// Static folder for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


//    ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assignments", assignmentRoutes);


//    GLOBAL ERROR HANDLER
app.use(errorHandler);

export default app;