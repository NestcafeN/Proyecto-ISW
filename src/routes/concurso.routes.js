"use strict";
import express from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { concursoController } from "../controllers/concurso.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
const router = express.Router();
router.use(authenticationMiddleware);

router.get("/", concursoController.getConcursos);
router.get("/:id", concursoController.getConcursoById);
router.post("/", isAdmin, concursoController.createConcurso);
router.put("/:id", isAdmin, concursoController.updateConcurso);
router.delete("/:id", isAdmin, concursoController.deleteConcurso);

export default router;
