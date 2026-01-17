interface RegistrationPayload {
    email: string;
    role: string;
    purpose: 'registration';
}
export declare function generateRegistrationToken(email: string, role: string): string;
export declare function verifyRegistrationToken(token: string): RegistrationPayload | null;
export {};
//# sourceMappingURL=jwt.d.ts.map