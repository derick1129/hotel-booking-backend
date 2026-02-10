import type { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(
            req.body.name,
            req.body.email,
            req.body.password
        );
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(201).json(userWithoutPassword);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req:Request, res: Response) => {
    try {
        const token = await loginUser(
            req.body.email,
            req.body.password
        );
        res.json({ token });
    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
};