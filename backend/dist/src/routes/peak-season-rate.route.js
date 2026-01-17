import { Router } from "express";
import { createPeakSeasonRate, getPeakSeasonRates } from "../controllers/peak-season-rate.controller.js";
import { fileUpload } from "../middlewares/file-upload.js";
import { verifyAuthToken } from "../utils/verifyAuthToken.js";
// import authMiddleware from 
const router = Router();
router.get('/', verifyAuthToken, getPeakSeasonRates);
router.post('/create', createPeakSeasonRate);
export default router;
//# sourceMappingURL=peak-season-rate.route.js.map