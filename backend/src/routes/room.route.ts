import { Router } from "express";
import {getRoomsByRoomTypeId,createRoom,updateRoom,deleteRoom} from "../controllers/room.controllers.js"
import { verifyAuthToken } from "../utils/verifyAuthToken.js";

const router = Router();
router.get('/:roomTypeId',verifyAuthToken,getRoomsByRoomTypeId)
router.post('/create/:roomTypeId',verifyAuthToken,createRoom)
router.put('/update/:roomId',verifyAuthToken,updateRoom)
router.delete('/delete/:roomId',verifyAuthToken,deleteRoom)

export default router;
