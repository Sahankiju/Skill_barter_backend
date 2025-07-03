import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { userCollection } from "../models/user-model.js";
import bcrypt from "bcryptjs";


export const registerController = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
  try {
    const { username, email,hashpassword } = req.body;
    const checkUsername = await userCollection.findOne({ username });
    const checkEmail = await userCollection.findOne({ email });

    if (checkUsername) {
      return res.status(409).json({
        success: false,
        message: "username is taken",
      });
    }
    if (checkEmail) {
      return res.status(409).json({
        success: false,
        message: "Email is already used",
      });
    }
    const hashedpassword =  bcrypt.hashSync(hashpassword, salt);

    const newlyAddedUser = new userCollection({
      username,
      email,
      hashpassword: hashedpassword,
    });
   await  newlyAddedUser.save();

    res.status(201).json({
      success: true,
      message: "user is added succesfully",
      user: newlyAddedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(505).json({
      success: false,
      message: "failed to register new user",
    });
  }
};


export const loginController = async (req,res)=>{

  try {
    const {username, hashpassword} = req.body;
  const user = await userCollection.findOne({username})
  if(!user){
    return res.status(404).json({
      success:false,
      message:"Invalid credentials"
    })
  }
  const checkPassword = await bcrypt.compare(hashpassword,user.hashpassword);
  if(!checkPassword){
    return res.status(404).json({
      success:false,
      message:"Invalid credentials"
    })
  }

  const accessToken = jwt.sign({
    username:user.username,
    userId:user._id,
  },process.env.JWT_Secret,{
    expiresIn:'3h'
  })

  res.status(201).json({
    success:true,
    message:"login successful",
    accessToken
  })
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success:false,
      message:"failed to login"
    })
    
  }
  
}