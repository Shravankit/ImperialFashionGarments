import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";


//register logic
export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, answer, address} = req.body;

        if(!name)
        {
            return res.send({message: 'Name Required'});
        }
        if(!email)
        {
            return res.send({message: 'Email Required'});
        }
        if(!password)
        {
            return res.send({message: 'password Required'});
        }
        if(!phone)
        {
            return res.send({message: 'phone Required'});
        }
        if(!answer)
        {
            return res.send({message: 'answer Required'});
        }
        if(!address)
        {
            return res.send({message: 'address Required'});
        }

        //existing user
        //check user
        const existingUser = await userModel.findOne({email})

        if(existingUser)
        {
            return res.status(200).send({
                success: false,
                message: 'user already exists',
            });
        }

        //hashing password
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({
            name, 
            email,  
            phone, 
            address,
            answer,
            password: hashedPassword,}).save();

        res.status(201).send({
            success: true,
            message: 'user registration succesful',
            user,
        });

    } catch (error) {
        console.log(error);
        res.statue(500).send({
            success:false,
            message: 'error in registration',
            error
        })
    }
};

//login logic
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;

        //validation
        if(!email || !password)
        {
            return res.status(201).send({
                success: false,
                message: 'invalid Email or Password',
            });
        }

        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).send({
              success: false,
              message: "Email is not registerd",
            });
          }

        const match = await comparePassword(password, user.password);

        if(!match)
        {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password',
            });
        }

        //token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRECT, {expiresIn: '7d'});

        res.status(200).send({
            success: true,
            message: 'login Succesful',
            user:{
                _id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                address: user.address,
                role: user.role,
            },
            token,
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

//forgot password
export const forgotPasswordContoller = async (req, res) => {
    try {
        const {email, answer, newPassword} =  req.body;
        
        if(!email)
        {
            res.status(400).send({message: 'email is required'});
        }
        if(!answer)
        {
            res.status(400).send({message: 'answer is required'});
        }
        if(!newPassword)
        {
            res.status(400).send({message: 'New Password is Required'})
        }

        //check user
        const user = await userModel.findOne({email, answer});

        if(!user && !answer)
        {
            res.status(404).send({
                success:false,
                message: 'Email or Answer is not Valid',
            });
        }

        const hashedNewPassword = await hashPassword(newPassword);

        await userModel.findByIdAndUpdate(user._id, {password: hashedNewPassword});

        res.status(200).send(
            {
                success: true,
                message: 'Password Has Changed Succesfully',
            }
        )
        
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: true,
                message: 'Something went Wrong',
            }
        )
    }
}

//test controller logic
export const testController = async (req, res) => {
    console.log('protected controller');
    res.status(200).send({
        message: 'protected Route',
    });
};