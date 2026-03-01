import { logError } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  // Log the error using logError
    logError(err.stack || err.message);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Server Error",
    });
};