import mongoose from "mongoose";
import { userCollection } from "../models/user-model.js";
import { codingCategory } from "../models/skillCategories.js";
import { musicCategory } from "../models/skillCategories.js";
import { graphicCategory } from "../models/skillCategories.js";
import { SkilltoTeachCategoryAdder } from "../../Utilities/categoryAdder.js";

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
    SkilltoTeachCategoryAdder(skillToTeach,userId);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "cloudnt add skill To  skillToTeach",
    });
  }
};
