import express from "express";
import concursoRoutes from './concurso.routes.js';
import fondoRoutes from './fondos.routes.js';
import postulacionRoutes from './postulacion.routes.js'
import rubricaRoutes from './rubrica.routes.js';
const router = express.Router();

router.use('/concursos', concursoRoutes);
router.use('/fondos', fondoRoutes);
router.use('/postulacion', postulacionRoutes);
router.use('/rubrica', rubricaRoutes);

export default router;