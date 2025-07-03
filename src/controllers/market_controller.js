import mongoose from "mongoose";
import { userCollection } from "../models/user-model.js";


export const matchmakingController = async (req,res)=>{
    const userId = req.userInfo.userId;
    const User = await userCollection.findById(userId);
    const skillToLearn= User.skillToLearn;
    const skillToTeach = User.skillToTeach;
    const skillToTeachName=[];
    skillToTeach.forEach((skill) => {
        skillToTeachName.push(skill.skillName);
    });

    
}