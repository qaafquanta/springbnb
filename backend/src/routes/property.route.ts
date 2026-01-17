import { Router } from "express";
import {fetchCreatePropertyPage,createProperty,dashboardProperties,getAllProperties,getPropertyDetail,getSearchInfo,filterAllProperties,getPropertyForEdit,updateProperty,deleteProperty} from "../controllers/property.controllers.js"
import {fileUpload} from "../middlewares/file-upload.js"
import { verifyAuthToken } from "../utils/verifyAuthToken.js";

const router = Router();
router.post('/create-property',verifyAuthToken,fileUpload.single("imageUrl"),createProperty)
router.get('/filter-all-properties',filterAllProperties)
router.get('/properties',getAllProperties)
router.get('/search-info',getSearchInfo)
router.get('/fetch-create-property-page',fetchCreatePropertyPage);
router.get('/dashboard-properties',verifyAuthToken,dashboardProperties)
router.get('/edit/:id',verifyAuthToken,getPropertyForEdit)
router.put('/update/:id',verifyAuthToken,fileUpload.array("images", 10),updateProperty)
router.delete('/delete/:id',verifyAuthToken,deleteProperty)
router.get('/:id',getPropertyDetail)

export default router;