// lib/jwt.ts
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

interface RegistrationPayload {
  email: string;
  role: string;
  purpose: 'registration';
}

export function generateRegistrationToken(email: string,role:string): string {
  const payload: RegistrationPayload = {
    email,
    role,
    purpose: 'registration'
  };
  
  // Token berlaku 1 jam
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h'
  });
}

export function verifyRegistrationToken(token: string): RegistrationPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as RegistrationPayload;
    
    // Validasi purpose
    if (decoded.purpose !== 'registration') {
      return null;
    }
    
    return decoded;
  } catch (error) {
    // Token invalid atau expired
    return null;
  }
}