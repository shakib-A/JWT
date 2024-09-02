import { Router } from "express";
import authController from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);

export default router;
