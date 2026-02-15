import User from "./user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed
    });

    return user;
}

export const loginUser = async (
    email: string,
    password: string
) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );

    return token;
}