import { Router } from "express";
import {fetchCreatePropertyPage,createProperty,dashboardProperties,getAllProperties,getPropertyDetail} from "../controllers/property.controllers.js"
import {fileUpload} from "../middlewares/file-upload.js"
import { verifyAuthToken } from "../utils/verifyAuthToken.js";
// import authMiddleware from 

const router = Router();
router.post('/create-property',verifyAuthToken,fileUpload.single("imageUrl"),createProperty)

router.get('/properties',getAllProperties)
router.get('/fetch-create-property-page',fetchCreatePropertyPage);
router.get('/dashboard-properties',verifyAuthToken,dashboardProperties)
router.get('/:id',getPropertyDetail)

export default router;