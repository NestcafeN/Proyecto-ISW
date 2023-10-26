import express from "express";
import { rubricaController } from '../controllers/rubrica.controller.js';
const router = express.Router();

router.get("/", rubricaController.getRubricas);
router.get("/:id", rubricaController.getRubricaById);
router.post("/", rubricaController.createRubrica);
router.put("/:id", rubricaController.updateRubrica);
router.delete("/:id", rubricaController.deleteRubrica);

export default router;