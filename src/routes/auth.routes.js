"use strict";
import express from "express";
import { authController } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

export default router;
