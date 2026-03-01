import { verifyToken } from "../utils/generateToken.js";
import User from "../models/user.model.js";

/** Protect routes - require valid JWT token */
const protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1]; // Bearer <token>
        }

        if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token missing",
        });
        }

    //Verify token
    const decoded = verifyToken(token);

    //Attach user to req object (exclude password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found",
        });
    }

    req.user = user;
    next(); // Allow access

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token invalid",
            error: error.message,
        });
    }
};

export default protect;