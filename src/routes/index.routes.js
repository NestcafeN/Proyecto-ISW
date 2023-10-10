import express from "express";
const router = express.Router();
import concursoRoutes from './concurso.routes.js';
import fondoRoutes from './fondos.routes.js';

router.use('/concursos', concursoRoutes);
router.use('/fondos', fondoRoutes);

export default router;