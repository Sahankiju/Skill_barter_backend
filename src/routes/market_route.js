import express from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { matchmakingController } from "../controllers/market_controller.js";
export const router = express.Router();

router.get("/matchmaking", authMiddleware,matchmakingController);
