import {
  codingCategory,
  graphicCategory,
  musicCategory,
} from "../src/models/skillCategories.js";
import mongoose from "mongoose";

const categoryModels = {
  coding: codingCategory,
  graphics: graphicCategory,
  music: musicCategory,
};

export const SkilltoTeachCategoryAdder = async (skillToTeach, userId) => {
  try {
    for (const skill of skillToTeach) {
      const skillName = skill.skillName;
      const skillLevel = skill.level;
      const categoryModel = categoryModels[skill.category.toLowerCase()];
      if (!categoryModel) continue;
      await categoryModel.updateOne(
        {},
        { $set: { [`${skillName}`]: { userId, level: skillLevel } } },
        { upsert: true }
      );
    }
  } catch (error) {
    console.log(error);
    
  }
};
