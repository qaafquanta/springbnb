import dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";
import type{ Request, Response, NextFunction } from "express";

const secretKey = process.env.JWT_SECRET || "secret";


export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  let authToken = req.cookies.authToken;
  
  if (!authToken && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      authToken = authHeader.substring(7);
    }
  }

  if (!authToken) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(authToken, secretKey);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token",tokenYangDiCek:authToken });
  }
};