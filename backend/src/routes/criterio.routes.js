import express from "express";
import { isAdmin , isEvaluador } from '../middlewares/authorization.middleware.js';
import { criterioController } from '../controllers/criterio.controller.js';
import authenticationMiddleware from '../middlewares/authentication.middleware.js';
const router = express.Router();
router.use(authenticationMiddleware);

router.get("/", isAdmin, criterioController.getCriterios);
router.get("/:id", isAdmin, criterioController.getCriterioById);
router.post("/", isAdmin, criterioController.createCriterio);
router.put("/:id", isAdmin, criterioController.updateCriterio);
router.put("/:id/puntaje/", isEvaluador, criterioController.updatePuntaje);
router.delete("/:id", isAdmin, criterioController.deleteCriterio);

export default router;