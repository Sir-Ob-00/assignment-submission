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
        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // links to User model
        },
        fileUrl: {
            type: String, // optional, if you allow file submissions
        },
        grade: {
            type: Number, // optional, assigned by lecturer/admin
        },
        status: {
            type: String,
            enum: ["pending", "submitted", "graded"],
            default: "pending",
        },
    },
    {
        timestamps: true, // createdAt & updatedAt
    }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;