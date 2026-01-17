import { Router } from "express";
import { createRoomType, getRoomTypesByTenantId } from "../controllers/roomType.controllers.js";
import { fileUpload } from "../middlewares/file-upload.js";
import { verifyAuthToken } from "../utils/verifyAuthToken.js";
// import authMiddleware from 
const router = Router();
router.get('/', verifyAuthToken, getRoomTypesByTenantId);
router.post('/create/:propertyId', verifyAuthToken, fileUpload.single("imageUrl"), createRoomType);
export default router;
//# sourceMappingURL=roomType.route.js.map