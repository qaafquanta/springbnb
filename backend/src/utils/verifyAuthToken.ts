import dotenv from 'dotenv';
dotenv.config();

// middleware untuk verifikasi JWT
import jwt from "jsonwebtoken";
import type{ Request, Response, NextFunction } from "express";

const secretKey = process.env.JWT_SECRET || "secret";


export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.cookies.authToken;
  if (!authToken) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(authToken, secretKey);
    (req as any).user = decoded; // simpan user info ke request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token",tokenYangDiCek:authToken });
  }
};