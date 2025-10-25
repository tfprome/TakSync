import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: { id: string; email: string } | JwtPayload; // type of JWT payload
}

const verifytoken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token found" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as { id: string; email: string } | JwtPayload;

    req.user = decoded; 
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifytoken;
