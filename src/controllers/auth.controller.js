import { registerUser, loginUser } from "../services/auth.service.js";

/**
 * Register Controller
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const result = await registerUser({ name, email, password, role });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });

    } catch (error) {
        next(error); // Pass to error middleware
    }
};

/**
 * Login Controller
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await loginUser({ email, password });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });

    } catch (error) {
        next(error); // Pass to error middleware
    }
};