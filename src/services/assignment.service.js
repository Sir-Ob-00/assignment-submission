import Assignment from "../models/assignment.model.js";

/**
 * Create a new assignment (for lecturer/admin)
 * { title, description, dueDate }
 */
export const createAssignment = async (data) => {
    const assignment = await Assignment.create({
        ...data,
        status: "pending",
    });
    return assignment;
};

/**
 * Get all assignments for a student
 *  - MongoDB ObjectId of student
 */
export const getAssignmentsForStudent = async (studentId) => {
    const assignments = await Assignment.find({ submittedBy: studentId })
        .sort({ dueDate: 1 }); // upcoming first
    return assignments;
};

/**
 * Get all assignments (for lecturers/admin)
 */
export const getAllAssignments = async () => {
    const assignments = await Assignment.find().populate("submittedBy", "name email role");
    return assignments;
};

/**
 * Submit an assignment
 *  - e.g., { fileUrl }
 */
export const submitAssignment = async (assignmentId, studentId, submissionData) => {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
        throw new Error("Assignment not found");
    }

    assignment.submittedBy = studentId;
    assignment.status = "submitted";
    if (submissionData.fileUrl) assignment.fileUrl = submissionData.fileUrl;

    await assignment.save();

    return assignment;
};