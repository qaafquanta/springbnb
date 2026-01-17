// lib/jwt.ts
import * as jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
export function generateRegistrationToken(email, role) {
    const payload = {
        email,
        role,
        purpose: 'registration'
    };
    // Token berlaku 1 jam
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h'
    });
}
export function verifyRegistrationToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Validasi purpose
        if (decoded.purpose !== 'registration') {
            return null;
        }
        return decoded;
    }
    catch (error) {
        // Token invalid atau expired
        return null;
    }
}
//# sourceMappingURL=jwt.js.map