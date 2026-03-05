import express from "express";
import protect from "../middleware/auth.middleware.js";
import { roleCheck } from "../middleware/role.middleware.js";
import upload from "../config/multer.js";
import {
    createNewAssignment,
    getAssignments,
    getStudentAssignments,
    submitStudentAssignment,
    deleteAssignment,
} from "../controllers/assignment.controller.js";

const router = express.Router();

// Lecturer/Admin: create assignment (optional PDF attachment)
router.post(
    "/",
    protect,
    roleCheck(["lecturer", "admin"]),
    upload.single("attachment"),       // ← field name: "attachment"
    createNewAssignment
);

// Lecturer/Admin: list all assignments
router.get("/all", protect, roleCheck(["lecturer", "admin"]), getAssignments);

// Student: list own assignments
router.get("/student", protect, getStudentAssignments);

// Student: submit assignment PDF
router.post(
    "/submit/:id",
    protect,
    roleCheck(["student"]),
    upload.single("file"),             // ← field name: "file"
    submitStudentAssignment
);

// Lecturer/Admin: delete assignment
router.delete("/:id", protect, roleCheck(["lecturer", "admin"]), deleteAssignment);

export default router;