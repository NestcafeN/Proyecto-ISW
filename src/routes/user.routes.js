"use strict";
import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
const router = Router();

router.use(authenticationMiddleware);

router.get("/", UserController.getUsers);
router.post("/", isAdmin, UserController.createUser);
router.get("/:id", UserController.getUserById);
router.put("/:id",isAdmin,UserController.updateUser,);
router.delete("/:id",isAdmin,UserController.deleteUser,);

export default router;
