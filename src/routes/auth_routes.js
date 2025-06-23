import express from 'express'
import { loginController, registerController } from '../controllers/auth_controller.js';
export const router = express.Router();

router.post('/register',registerController);
router.post('/login',loginController);