/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
    role?: string;
    email?: string;
};

// Token Signature Verify (For Node.js / Server Side)
const verifyToken = (token: string, secret: string) => {
    try {
        const verifiedToken = jwt.verify(token, secret);
        return {
            success: true,
            data: verifiedToken as CustomJwtPayload
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    };
};

// Token Payload Decode (For Quick Data Reading)
const decodeToken = (token: string): CustomJwtPayload | null => {
    try {
        const decoded = jwt.decode(token);
        return decoded as CustomJwtPayload;
    } catch {
        return null;
    };
};

export const jwtUtils = {
    verifyToken,
    decodeToken,
};