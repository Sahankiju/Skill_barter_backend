import mongoose from "mongoose";
import fs from "fs/promises";
import { userCollection } from "../models/user-model.js";
import { SkilltoTeachCategoryAdder } from "../Utilities/categoryAdder.js";
import { uploadProfilePic } from "../Utilities/profilepic_cloudinary.js";

export const addSkillTeach = async (req, res) => {
  try {
    const { username, userId } = req.userInfo;
    const skillToTeach = req.body.skillToTeach;
    console.log(userId, skillToTeach[0].skillName);

    const result = await userCollection.findByIdAndUpdate(
      userId,
      { $push: { skillToTeach: { $each: skillToTeach } } },
      {
        new: true,
      }
    );
    if (result) {
      res.status(201).json({
        success: true,
        result: result,
      });
    }
    SkilltoTeachCategoryAdder(skillToTeach, userId);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "cloudnt add skill To  skillToTeach",
    });
  }
};

export const updateUserbio = async (req, res) => {
  try {
    const { username, userId } = req.userInfo;
    const bio = req.body.bio;
    const updatedBio = await userCollection.findByIdAndUpdate(
      userId,
      { bio: bio },
      { new: true }
    );
    if (updatedBio) {
      res.status(201).json({
        success: true,
        message: "bio is updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "error while updating bio",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error while updating bio",
    });
  }
};

export const addSkillLearn = async (req, res) => {
  try {
    const { username, userId } = req.userInfo;
    const skillToLearn = req.body.skillToLearn;
    const addedSkill = await userCollection.findByIdAndUpdate(
      userId,
      { skillToLearn: skillToLearn },
      { new: true }
    );
    if (addedSkill) {
      res.status(201).json({
        success: true,
        message: "Skill to Learn is added successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "unsuccesfull to add skill to learn",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "unsuccesfull to add skill to learn",
    });
  }
};

export const addProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "upload an image",
      });
    }
    console.log(req.file.path);

    const { url } = await uploadProfilePic(req.file.path);
    const { username, userId } = req.userInfo;
    const uploadedPic = await userCollection.findByIdAndUpdate(
      userId,
      { profilePicURL: url },
      { new: true }
    );
    if (uploadedPic) {
      await fs.unlink(req.file.path);
      res.status(201).json({
        success: true,
        message: "profile pic is updated succesfully",
        user: uploadedPic,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "unable to upload an profile pic",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "unable to upload an profiel pic",
    });
  }
};
