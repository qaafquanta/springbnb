import { Router } from "express";
import { 
    getPropertyCategories, 
    getTenantCategories,
    getPublicPropertyCategories,
    getPropertyCategory, 
    createPropertyCategory, 
    updatePropertyCategory, 
    deletePropertyCategory 
} from "../controllers/property-category.controllers.js"
import { verifyAuthToken } from "../utils/verifyAuthToken.js";

const router = Router();

router.get('/', verifyAuthToken, getPropertyCategories)
router.get('/my-categories', verifyAuthToken, getTenantCategories)
router.get('/:id', getPropertyCategory)
router.post('/create', verifyAuthToken, createPropertyCategory)
router.put('/update/:id', verifyAuthToken, updatePropertyCategory)
router.delete('/delete/:id', verifyAuthToken, deletePropertyCategory)

router.get('/public/list', getPublicPropertyCategories)

export default router;
