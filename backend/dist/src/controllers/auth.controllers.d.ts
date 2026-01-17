import type { Request, Response } from "express";
export declare const sendEmailRegister: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const verifyRegistrationToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const authCheck: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logout: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const resetPasswordSendEmail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const verifyResetPasswordToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const resetPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const googleRegister: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const googleLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.controllers.d.ts.map