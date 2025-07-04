import express from 'express';
import { authMiddleware } from '../middlewares/auth_middleware.js';
import { addSkillTeach, updateUserbio } from '../controllers/profile_controller.js';

export const router = express.Router();

router.post("/add/skillToTeach",authMiddleware,addSkillTeach);
router.post("/add/bio",authMiddleware,updateUserbio);