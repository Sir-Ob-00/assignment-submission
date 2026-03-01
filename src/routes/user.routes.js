import express from "express";
import protect from "../middleware/auth.middleware.js";
import { roleCheck } from "../middleware/role.middleware.js";
import {
    getAllUsers,
    deleteUser,
    getAllStudents,
    getCurrentUser,
} from "../controllers/user.controller.js";

const router = express.Router();


 // Admin Routes
router.get("/", protect, roleCheck(["admin"]), getAllUsers);
router.delete("/:id", protect, roleCheck(["admin"]), deleteUser);

// Lecturer Routes 
router.get("/students", protect, roleCheck(["lecturer"]), getAllStudents);

// All Logged-in Users
router.get("/me", protect, getCurrentUser);

export default router;