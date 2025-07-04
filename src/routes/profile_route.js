import express from 'express';
import { authMiddleware } from '../middlewares/auth_middleware.js';
import { addSkillTeach } from '../controllers/profile_controller.js';

export const router = express.Router();

router.post("/add/skillToTeach",authMiddleware,addSkillTeach)