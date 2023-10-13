import express from "express";
import { getFondos, getFondoById, createFondo, updateFondo, deleteFondo } from '../controllers/fondo.controller.js';
const router = express.Router();

router.get('/', getFondos);
router.get('/:id', getFondoById);
router.post('/', createFondo);
router.put('/:id', updateFondo);
router.delete('/:id', deleteFondo);

export default router;