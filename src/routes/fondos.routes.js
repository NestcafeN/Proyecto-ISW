import express from "express";
import { getFondos, getFondo, createFondo, updateFondo, deleteFondo } from '../controllers/fondo.controller.js';
const router = express.Router();

router.get('/', getFondos);
router.get('/:id', getFondo);
router.post('/', createFondo);
router.put('/:id', updateFondo);
router.delete('/:id', deleteFondo);

export default router;