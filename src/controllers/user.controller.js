import User from "../models/user.model.js";
import { logError } from "../utils/logger.js";

/**
 * Admin: Get all users
 * GET /api/users
 */
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        logError(`Get All Users Error: ${error.message}`);
        next(error);
    }
};

/**
 * Admin: Delete a user
 * DELETE /api/users/:id
 */
export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        logError(`Delete User Error: ${error.message}`);
        next(error);
    }
};

/**
 * Lecturer: View all students
 * GET /api/users/students
 */
export const getAllStudents = async (req, res, next) => {
    try {
        const students = await User.find({ role: "student" }).select("-password");

        res.status(200).json({
            success: true,
            count: students.length,
            data: students,
        });
    } catch (error) {
        logError(`Get Students Error: ${error.message}`);
        next(error);
    }
};

/**
 * User: View own profile
 * GET /api/users/me
 */
export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        logError(`Get Current User Error: ${error.message}`);
        next(error);
    }
};