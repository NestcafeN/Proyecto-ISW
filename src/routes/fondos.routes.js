import express from "express";
import { fondoController } from '../controllers/fondo.controller.js';
const router = express.Router();

router.get('/', fondoController.getFondos);
router.get('/:id', fondoController.getFondoById);
router.post('/', fondoController.createFondo);
router.put('/:id', fondoController.updateFondo);
router.delete('/:id', fondoController.deleteFondo);

export default router;