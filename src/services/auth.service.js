import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";

/** Register a new user */
export const registerUser = async ({ name, email, password, role }) => {
  // 1. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

  // 2. Hash password
    const hashedPassword = await hashPassword(password);

  // 3. Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "student", // default role
    });

  // 4. Generate token
    const token = generateToken({
        id: user._id,
        role: user.role,
    });

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    };
};

/** Login existing user */
export const loginUser = async ({ email, password }) => {
  // 1. Find user and explicitly select password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid credentials");
    }

    // 2. Compare passwords
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

  // 3. Generate token
    const token = generateToken({
        id: user._id,
        role: user.role,
    });

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    };
};