import {
    createAssignment,
    getAssignmentsForStudent,
    getAllAssignments,
    submitAssignment,
} from "../services/assignment.service.js";
import { logError } from "../utils/logger.js";

/**
 * Create a new assignment (Lecturer/Admin)
 * POST /api/assignments
 */
export const createNewAssignment = async (req, res, next) => {
    try {
        const data = req.body; // { title, description, dueDate }

        const assignment = await createAssignment(data);

        res.status(201).json({
            success: true,
            message: "Assignment created successfully",
            data: assignment,
        });
    } catch (error) {
        logError(`Create Assignment Error: ${error.message}`);
        next(error);
    }
};

/**
 * Get all assignments (Lecturer/Admin)
 * GET /api/assignments/all
 */
export const getAssignments = async (req, res, next) => {
    try {
        const assignments = await getAllAssignments();

        res.status(200).json({
            success: true,
            data: assignments,
        });
    } catch (error) {
        logError(`Get All Assignments Error: ${error.message}`);
        next(error);
    }
};

/**
 * Get assignments for logged-in student
 * GET /api/assignments/student
 */
export const getStudentAssignments = async (req, res, next) => {
    try {
        const studentId = req.user._id;
        const assignments = await getAssignmentsForStudent(studentId);

        res.status(200).json({
            success: true,
            data: assignments,
        });
    } catch (error) {
        logError(`Get Student Assignments Error: ${error.message}`);
        next(error);
    }
};

/**
 * Submit assignment (Student) - handles PDF upload via Multer
 * POST /api/assignments/submit/:id
 */
export const submitStudentAssignment = async (req, res, next) => {
    try {
        const assignmentId = req.params.id;
        const studentId = req.user._id;

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded. Please attach a PDF file.",
        });
        }

        // Prepare submission data for service
        const submissionData = {
            fileUrl: `/uploads/${req.file.filename}`, // use static path
            submittedAt: new Date(),
            status: "submitted",
        };

        const assignment = await submitAssignment(assignmentId, studentId, submissionData);

        res.status(200).json({
            success: true,
            message: "Assignment submitted successfully",
            data: assignment,
        });
    } catch (error) {
        logError(`Submit Assignment Error: ${error.message}`);
        next(error);
    }
    };