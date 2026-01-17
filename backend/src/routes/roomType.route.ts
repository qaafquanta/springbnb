import { Router } from "express";
import {createRoomType,getRoomTypesByTenantId,getRoomTypeCalendar} from "../controllers/room-type.controllers.js"
import {fileUpload} from "../middlewares/file-upload.js"
import { verifyAuthToken } from "../utils/verifyAuthToken.js";

const router = Router();
router.get('/',verifyAuthToken,getRoomTypesByTenantId)
router.get('/:id/calendar',getRoomTypeCalendar)
router.post('/create/:propertyId',verifyAuthToken,fileUpload.single("imageUrl"),createRoomType)

export default router;