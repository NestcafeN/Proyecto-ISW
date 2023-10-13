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