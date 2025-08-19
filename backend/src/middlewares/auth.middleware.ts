import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { ENV } from "../config/env";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: "Token not provided." });

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string; email: string };
        (req as any).user = decoded;
        next();
    } catch (error: any) {
        return res.status(401).json({ error: "Invalid token." });
    }
};