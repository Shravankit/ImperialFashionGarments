import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddlewear.js";
import { createProductController, deleteProductController, getAllProductsController, getProductPhotoController, getSingleProduct, productFilterController, updateProductController } from "../Controller/productController.js";
import formidable from "express-formidable";

const router = express.Router();


//product routes
//create product
router.post('/create-product', requireSignin, isAdmin, formidable(), createProductController);

//get all products routes
router.get('/get-all-product', getAllProductsController);

//get single product
router.get('/get-single-product/:slug', getSingleProduct);

//get product photo
router.get('/get-product-photo/:pid', getProductPhotoController);

//delete product
router.delete('/delete-product/:pid', deleteProductController);

//update product
router.put('/update-product/:pid', requireSignin, isAdmin, formidable(), updateProductController);

//product filter Route
router.post('/product-filters', productFilterController);


export default router;