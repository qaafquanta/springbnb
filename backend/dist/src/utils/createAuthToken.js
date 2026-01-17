import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const sign = jwt.sign;
const secretKey = process.env.JWT_SECRET || "secret";
export const createAuthToken = (data) => {
    return sign({
        id: data.id,
        role: data.role
    }, secretKey, {
        expiresIn: "30d"
    });
};
//# sourceMappingURL=createAuthToken.js.map