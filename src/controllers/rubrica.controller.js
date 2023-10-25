import { Rubrica } from '../models/rubrica.model.js';

export async function getRubricas(req, res) {
    try {
        const rubricas = await Rubrica.find();
        res.status(200).json({ rubricas });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las Rúbricas" });
    }
}

export async function getRubrica(req, res) {
    try {
        const rubrica = await Rubrica.findById(req.params.id);
        if (!rubrica) {
            return res.status(404).json({ message: "Rúbrica no encontrada" });
        }
        res.status(200).json({ rubrica });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la Rúbrica" });
    }
}

export async function createRubrica(req, res) {
    try {
        const rubrica = new Rubrica({
            nombre: req.body.nombre,
            tipoFondo: req.body.tipoFondo,
            criterios: req.body.criterios,
            puntajeMinimoAprobacion: req.body.puntajeMinimoAprobacion,
            puntajeMaximoAprobacion: req.body.puntajeMaximoAprobacion,
        });
        const nuevaRubrica = await rubrica.save();
        res.status(201).json(nuevaRubrica);
    } catch (error) {
        res.status(400).json({ message: "Error al crear Rúbrica" });
    }
}

export async function updateRubrica(req, res) {
    try {
        const rubrica = await Rubrica.findById(req.params.id);
        if (!rubrica) {
            return res.status(404).json({ message: "Rúbrica no encontrada" });
        }

        rubrica.nombre = req.body.nombre;
        rubrica.tipoFondo = req.body.tipoFondo;
        rubrica.criterios = req.body.criterios;
        rubrica.puntajeMinimoAprobacion = req.body.puntajeMinimoAprobacion;
        rubrica.puntajeMaximoAprobacion = req.body.puntajeMaximoAprobacion;

        const rubricaActualizada = await rubrica.save();
        res.status(200).json(rubricaActualizada);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar Rúbrica" });
    }
}

export async function deleteRubrica(req, res) {
    try {
        const rubrica = await Rubrica.findById(req.params.id);

        if (!rubrica) {
            return res.status(404).json({ message: "Rúbrica no encontrada" });
        }

        await rubrica.deleteOne();
        res.status(200).json({ message: "Rúbrica eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error al eliminar Rúbrica" });
    }
}
