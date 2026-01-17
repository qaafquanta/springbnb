import { Router } from "express";
import {createPeakSeasonRate,getPeakSeasonRates, deletePeakSeasonRate} from "../controllers/peak-season-rate.controller.js"
import { verifyAuthToken } from "../utils/verifyAuthToken.js";

const router = Router();
router.get('/',verifyAuthToken,getPeakSeasonRates)
router.post('/create',verifyAuthToken,createPeakSeasonRate)
router.delete('/delete/:id',verifyAuthToken,deletePeakSeasonRate)

export default router;