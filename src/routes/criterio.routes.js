import express from "express";
import { criterioController } from '../controllers/criterio.controller.js';
const router = express.Router();

router.get("/", criterioController.getCriterios);
router.get("/:id", criterioController.getCriterioById);
router.post("/", criterioController.createCriterio);
router.put("/:id", criterioController.updateCriterio);
router.delete("/:id", criterioController.deleteCriterio);

export default router;