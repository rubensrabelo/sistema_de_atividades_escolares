import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { ENV } from "../config/env";
import User from "../models/user.model";

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string; email: string; role: string };

    const user = await User.findById(decoded.id);
    if (!user || !user.active) {
      return res.status(401).json({ message: "User is deactivated" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
