"use strict";
import express from "express";
import { fondoController } from "../controllers/fondo.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
const router = express.Router();
router.use(authenticationMiddleware);

router.get("/", fondoController.getFondos);
router.get("/:id", fondoController.getFondoById);
router.post("/", isAdmin, fondoController.createFondo);
router.put("/:id", isAdmin, fondoController.updateFondo);
router.put("/:id/concursos", isAdmin, fondoController.updateIdConcurso);
router.put("/:id/montoMaximo", isAdmin, fondoController.updateMontoMaximo);
router.delete("/:id", isAdmin, fondoController.deleteFondo);

export default router;
