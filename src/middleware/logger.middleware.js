import { logInfo } from "../utils/logger.js";

export const logger = (req, res, next) => {
    logInfo(`${req.method} ${req.originalUrl} [${new Date().toISOString()}]`);
    next();
};