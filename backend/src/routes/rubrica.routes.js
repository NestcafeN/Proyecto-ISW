import express from "express";
import { rubricaController } from '../controllers/rubrica.controller.js';
import { isAdmin , commonAccessMiddleware } from '../middlewares/authorization.middleware.js';
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
const router = express.Router();
router.use(authenticationMiddleware);

router.get("/", commonAccessMiddleware, rubricaController.getRubricas);
router.get("/:id", commonAccessMiddleware, rubricaController.getRubricaById);
router.post("/", isAdmin, rubricaController.createRubrica);
router.put("/:id", isAdmin, rubricaController.updateRubrica);
router.put("/:id/criterio/", isAdmin, rubricaController.addCriterioById);
router.delete("/:id", isAdmin, rubricaController.deleteRubrica);
router.delete("/:RubricaID/criterio/:CriterioID", isAdmin, rubricaController.deleteCriterioById);

export default router;