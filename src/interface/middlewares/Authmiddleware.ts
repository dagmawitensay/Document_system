import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export interface RequestWithUserRole extends Request {
    user?: any,
}

export const authentication = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const authorizationHeader = req.header("Authorization")

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        res
            .status(401)
            .json({ success: false, message: "Invalid authorization header" });
    } else {
        const token = authorizationHeader.replace("Bearer ", "")
    if (!token) {
    res
        .status(401)
        .json({ success: false, message: "Authorization token not found" });
    }

    try {
        const decoded = jwt.verify(token, (process.env as any).JWT_SECRET_KEY);
        (req as any).user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
    }
}


export const isAdmin = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
    res
        .status(401)
        .json({ success: false, message: "Invalid authorization header" });
        return
    }
    next();
}

