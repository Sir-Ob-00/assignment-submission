import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        dueDate: {
            type: Date,
            required: [true, "Due date is required"],
        },
        // Attachment uploaded by lecturer when creating the assignment
        attachmentUrl: {
            type: String,
            default: null,
        },
        // Submission uploaded by student
        fileUrl: {
            type: String,
            default: null,
        },
        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        submittedAt: {
            type: Date,
            default: null,
        },
        grade: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["pending", "submitted", "graded"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;