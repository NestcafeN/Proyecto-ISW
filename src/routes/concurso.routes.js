import express from "express";
import { concursoController } from '../controllers/concurso.controller.js';
const router = express.Router();

router.get('/', concursoController.getConcursos);
router.get('/:id', concursoController.getConcursoById);
router.post('/', concursoController.createConcurso);
router.put('/:id', concursoController.updateConcurso);
router.delete('/:id', concursoController.deleteConcurso);

export default router;
