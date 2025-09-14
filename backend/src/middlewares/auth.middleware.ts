import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { ENV } from "../config/env";
import User from "../models/user.model";

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid token" });
    return;
  }

  const token: string | undefined = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string; email: string; role: string };

    const user = await User.findById(decoded.id);
    if (!user || !user.active) {
      res.status(401).json({ message: "User is deactivated" });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
