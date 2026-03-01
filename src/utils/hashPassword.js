import bcrypt from "bcrypt";

const SALT_ROUNDS = 12; // Industry standard (10–12 is common)

/** Hash a plain text password */
export const hashPassword = async (password) => {
    if (!password) {
        throw new Error("Password is required for hashing");
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

/** Compare plain password with hashed password */
export const comparePassword = async (plainPassword, hashedPassword) => {
    if (!plainPassword || !hashedPassword) {
        throw new Error("Both passwords are required for comparison");
    }

    return await bcrypt.compare(plainPassword, hashedPassword);
};