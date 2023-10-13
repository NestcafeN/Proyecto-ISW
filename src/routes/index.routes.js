import express from "express";
const router = express.Router();
import concursoRoutes from './concurso.routes.js';
import fondoRoutes from './fondos.routes.js';
import postulacionRoutes from './postulacion.routes.js'
import rubricaRoutes from './rubrica.routes.js';

router.use('/concursos', concursoRoutes);
router.use('/fondos', fondoRoutes);
router.use('/postulacion', postulacionRoutes);
router.use('/rubrica', rubricaRoutes);

export default router;