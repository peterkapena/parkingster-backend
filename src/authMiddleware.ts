import { AuthenticationError } from "type-graphql";
import jwt from "./utils/jwt.js";
import { Request } from "express";

export function authMiddleware(req: Request, _, next) {
    const accessToken = req.headers['authorization'];
    try {
        if (accessToken) {
            jwt.verifyAccessToken(accessToken);
        }
        return next();
    } catch (err) {
        return next(new AuthenticationError('Invalid or expired token'));
    }
}
