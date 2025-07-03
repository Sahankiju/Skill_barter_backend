import express from 'express';
import { authMiddleware } from '../middlewares/auth_middleware';

export const router = express.Router();

router.post("/add/skilltolearn",authMiddleware)