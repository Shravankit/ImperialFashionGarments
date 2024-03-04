import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
// import { comparePassword } from "../helpers/authHelper";

//protection routed to protect user using token

export const requireSignin = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRECT);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};

//admin protection router token
export const isAdmin = async (req, res, next) => {
    try{
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1)
        {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized User Admin",
            });
        }
        else{
            next();
        }
    } catch(error)
    {
        console.log(error);
        res.status(401).send(
            {
                success: false,
                message: "error in admin middleware",
                error
            }
        )
    }
}
