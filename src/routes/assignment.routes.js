import express from "express";
import protect from "../middleware/auth.middleware.js";
import { roleCheck } from "../middleware/role.middleware.js"; // optional, for lecturer/admin
import upload from "../config/multer.js";
import {
    createNewAssignment,
    getAssignments,
    getStudentAssignments,
    submitStudentAssignment,
} from "../controllers/assignment.controller.js";

const router = express.Router();

router.post("/", protect, roleCheck(["lecturer", "admin"]), createNewAssignment);
router.get("/all", protect, roleCheck(["lecturer", "admin"]), getAssignments);
router.get("/student", protect, getStudentAssignments);
router.post(
    "/submit/:id",
    protect,
    roleCheck(["student"]),
    upload.single("file"), // Multer handles single PDF upload
    submitStudentAssignment
);

export default router;