import express from "express";
import { getPostulaciones, getPostulacionById, createPostulacion, updatePostulacion, deletePostulacion, updateEstadoPostulacion } from '../controllers/postulacion.controller.js';
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.use(authenticationMiddleware);


router.get('/', getPostulaciones); 
router.get('/:id', getPostulacionById); 
router.post('/', createPostulacion); 
router.put('/:id', updatePostulacion); 
router.patch('/:id/estado', isAdmin, updateEstadoPostulacion);  // Ruta para actualizar solo el estado
router.delete('/:id', deletePostulacion); 

export default router;
