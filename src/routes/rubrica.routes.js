import express from "express";
import {getRubricas, getRubrica, createRubrica, updateRubrica, deleteRubrica} from '../controllers/rubrica.controller.js';
const router = express.Router();

router.get('/', getRubricas);
router.get('/:id', getRubrica);
router.post('/', createRubrica);
router.put('/:id', updateRubrica);
router.delete('/:id', deleteRubrica);

export default router;