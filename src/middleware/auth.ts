import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser, UserRole } from '../types/types';
import 'dotenv/config'

const SECRET = process.env.SECRET as string

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload | IUser;
        }
    }
}

function auth(role: UserRole = UserRole.User) {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const user = jwt.verify(token, SECRET) as JwtPayload;
            if (user.role < role) {
                return res.status(403).json({ error: 'User is not admin' });
            }

            req.user = user;
            next();
        } catch (error) {
            const err = error as JsonWebTokenError
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ error: 'Token expired' });
            }

            res.status(403).json({ error: 'Forbidden' });
        }
    }
}

export { auth }