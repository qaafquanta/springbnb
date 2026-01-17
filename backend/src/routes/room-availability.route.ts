import { Router } from "express";
import {
    getRoomAvailability,
    getUnavailableDatesByTenant,
    getRoomsByTenant,
    createUnavailability,
    deleteUnavailability,
    deleteUnavailabilityRange
} from "../controllers/room-availability.controllers.js"
import { verifyAuthToken } from "../utils/verifyAuthToken.js";

const router = Router();

router.get('/rooms', verifyAuthToken, getRoomsByTenant)
router.get('/unavailable', verifyAuthToken, getUnavailableDatesByTenant)
router.get('/:roomId', verifyAuthToken, getRoomAvailability)
router.post('/create', verifyAuthToken, createUnavailability)
router.delete('/delete/:id', verifyAuthToken, deleteUnavailability)
router.delete('/delete-range', verifyAuthToken, deleteUnavailabilityRange)

export default router;
