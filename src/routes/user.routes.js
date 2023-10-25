"use strict";
import express from "express";
import { UserController } from "../controllers/user.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", UserController.getUsers);
router.post("/", isAdmin, UserController.createUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", isAdmin, UserController.updateUser);
router.delete("/:id", isAdmin, UserController.deleteUser);
export default router;
