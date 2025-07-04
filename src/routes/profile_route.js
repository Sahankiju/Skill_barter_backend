import express from 'express';
import { authMiddleware } from '../middlewares/auth_middleware.js';
import { addProfilePic, addSkillLearn, addSkillTeach, updateUserbio } from '../controllers/profile_controller.js';
import { profilePicMiddleware } from '../middlewares/profilePic_middleware.js';

export const router = express.Router();

router.post("/add/skillToTeach",authMiddleware,addSkillTeach);
router.post("/add/bio",authMiddleware,updateUserbio);
router.post("/add/skillToLearn",authMiddleware,addSkillLearn);
router.post("/add/profilepic",authMiddleware,profilePicMiddleware.single('image'),addProfilePic);