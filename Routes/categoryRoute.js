import express from "express";
import { 
    isAdmin, 
    requireSignin 
} from "../middlewares/authMiddlewear.js";
import { 
    allCategoriesController, 
    categoryController, 
    deleteCategoryController, 
    oneCategoryController, 
    updateCategoryController 
} from "../Controller/categoryController.js";

const router = express.Router();

//category router
//create category
router.post('/create-category', requireSignin, isAdmin, categoryController);

//update category
router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController);

//get all category
router.get('/categories', allCategoriesController);

//single category fetch
router.get('/one-category/:slug', oneCategoryController);

//delete category
router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoryController);

export default router;