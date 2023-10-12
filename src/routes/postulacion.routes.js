import express from "express";
import { getPostulaciones, getPostulacion, createPostulacion, updatePostulacion, deletePostulacion } from '../controllers/postulacion.controller.js';
const router = express.Router();

router.get('/', getPostulaciones); 
router.get('/:id', getPostulacion); 
router.post('/', createPostulacion); 
router.put('/:id', updatePostulacion); 
router.delete('/:id', deletePostulacion); 


export default router;