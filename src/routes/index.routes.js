import express from "express";
import concursoRoutes from "./concurso.routes.js";
import fondoRoutes from "./fondos.routes.js";
import postulacionRoutes from "./postulacion.routes.js";
import rubricaRoutes from "./rubrica.routes.js";
import criterioRoutes from "./criterio.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
const router = express.Router();

router.use("/concursos", concursoRoutes);
router.use("/fondos", fondoRoutes);
router.use("/postulacion", postulacionRoutes);
router.use("/rubrica", rubricaRoutes);
router.use("/criterio", criterioRoutes);
router.use("/users", authenticationMiddleware, userRoutes);
router.use("/auth", authRoutes);

export default router;
