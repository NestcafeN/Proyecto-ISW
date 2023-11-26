"use strict";

import express from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { categoriaController } from "../controllers/categoria.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
const router = express.Router();
router.use(authenticationMiddleware);

router.get("/", categoriaController.getCategorias);
router.get("/:id", categoriaController.getCategoriaById);
router.post("/", isAdmin, categoriaController.createCategoria);
router.put("/:id", isAdmin, categoriaController.updateCategoria);
router.delete("/:id", isAdmin, categoriaController.deleteCategoria);

export default router;