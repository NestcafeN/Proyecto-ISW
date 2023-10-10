import express from "express";
import { getConcursos, getConcurso, createConcurso, updateConcurso, deleteConcurso } from '../controllers/concurso.controller.js';
const router = express.Router();

router.get('/', getConcursos);
router.get('/:id', getConcurso);
router.post('/', createConcurso);
router.put('/:id', updateConcurso);
router.delete('/:id', deleteConcurso);

export default router;
