import Assignment from "../models/assignment.model.js";

/**
 * Create a new assignment (lecturer/admin)
 * Reuses existing fileUrl field for optional lecturer attachment
 */
// service
export const createAssignment = async (data) => {
  return Assignment.create({
    title: data.title,
    description: data.description,
    dueDate: data.dueDate,
    attachmentUrl: data.attachmentUrl || null, // lecturer file
    status: "pending",
  });
};


/**
 * Get all assignments — annotated with submitted flag for a given student
 */
export const getAssignmentsForStudent = async (studentId) => {
    const assignments = await Assignment.find().sort({ dueDate: 1 });

    return assignments.map(a => {
        const obj = a.toObject();
        obj.submitted = !!(
            a.submittedBy &&
            a.submittedBy.toString() === studentId.toString() &&
            a.status === "submitted"
        );
        return obj;
    });
};

/**
 * Get all assignments (lecturers/admin)
 */
export const getAllAssignments = async () => {
    const assignments = await Assignment.find()
        .populate("submittedBy", "name email role")
        .sort({ createdAt: -1 });
    return assignments;
};

/**
 * Submit an assignment (student) — overwrites fileUrl with student's PDF
 */
export const submitAssignment = async (assignmentId, studentId, submissionData) => {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
        throw new Error("Assignment not found");
    }

    assignment.submittedBy  = studentId;
    assignment.status       = "submitted";
    assignment.submittedAt  = submissionData.submittedAt || new Date();
    if (submissionData.fileUrl) assignment.fileUrl = submissionData.fileUrl;

    await assignment.save();
    return assignment;
};

/**
 * Delete an assignment (lecturer/admin)
 */
export const removeAssignment = async (assignmentId) => {
    const assignment = await Assignment.findByIdAndDelete(assignmentId);
    return assignment;
};