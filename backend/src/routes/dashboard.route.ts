import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controllers.js"
import { verifyAuthToken } from "../utils/verifyAuthToken.js";

const router = Router();

router.get('/stats', verifyAuthToken, getDashboardStats)

export default router;
