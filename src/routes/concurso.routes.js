import express from "express";
import { getConcursos, getConcursoById, createConcurso, updateConcurso, deleteConcurso } from '../controllers/concurso.controller.js';
const router = express.Router();

router.get('/', getConcursos);
router.get('/:id', getConcursoById);
router.post('/', createConcurso);
router.put('/:id', updateConcurso);
router.delete('/:id', deleteConcurso);

export default router;
