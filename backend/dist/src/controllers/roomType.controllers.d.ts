import type { Request, Response } from "express";
export declare const createRoomType: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getRoomTypes: (req: Request, res: Response) => Promise<void>;
export declare const getRoomTypesByTenantId: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=roomType.controllers.d.ts.map