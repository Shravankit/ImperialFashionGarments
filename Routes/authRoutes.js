import express from "express";
import { 
    registerController, 
    loginController,
    testController, 
    forgotPasswordContoller
} from "../Controller/authController.js";
import { 
    requireSignin,
    isAdmin 
} from "../middlewares/authMiddlewear.js";

//router object

const router = express.Router();

//routes

// register routes post
router.post('/register', registerController);


//login routes post
router.post('/login', loginController);

//forget password
router.post('/forgot-password', forgotPasswordContoller);

//test controllet route
router.get('/test',requireSignin, isAdmin, testController);

//procted route
router.get('/user-auth', requireSignin, (req, res) => {
    res.status(200).send({ok: true});
});

//Admin procted route
router.get('/admin-auth', requireSignin, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
});

export default router;