import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false, // 🔐 Do not return password by default
        },

        role: {
            type: String,
            enum: ["student", "lecturer", "admin"],
            default: "student",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
        {
            timestamps: true, // createdAt & updatedAt
        }
    );

const User = mongoose.model("User", userSchema);

export default User;