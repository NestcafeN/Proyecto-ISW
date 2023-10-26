"use strict";

import { handleError } from "../utils/errorHandler.js";
import Rubrica from "../models/rubrica.model.js";

async function getRubricas() {
    try {
        const rubricas = await Rubrica.find();

        if (!rubricas || rubricas.length === 0) {
            return [[], "No hay rubricas registradas"];
        }
        return [rubricas, null];
    } catch (error) {
        handleError(error, "rubrica.service -> getRubricas");
    }
}

async function getRubricaById(id) {
    try {
        const rubrica = await Rubrica.findById(id);
        if (!rubrica) {
            return [null, "Rubrica no encontrada"];
        }
        return [rubrica, null];
    } catch (error) {
        handleError(error, "rubrica.service -> getRubricaById");
    }
}

async function createRubrica(rubrica) {
    try {
        const { nombre, criterios, puntajeMinimoAprobacion, puntajeMaximoAprobacion, tipoFondo } = rubrica;

        // Validación de datos de entrada
        if (!nombre || !criterios || !puntajeMinimoAprobacion || !puntajeMaximoAprobacion || tipoFondo === undefined) {
            return [null, "Faltan datos obligatorios para crear la rubrica"];
        }

        const rubricaFound = await Rubrica.findOne({ nombre });

        if (rubricaFound) {
            return [null, "La rubrica ya existe"];
        }
        const newRubrica = new Rubrica({
            nombre,
            criterios,
            puntajeMinimoAprobacion,
            puntajeMaximoAprobacion,
            tipoFondo,
        });
        await newRubrica.save();
        return [newRubrica, null];
    }
    catch (error) {
        handleError(error, "rubrica.service -> createRubrica");
    }
}

async function updateRubrica(id, rubrica) {
    try {
        const rubricaFound = await Rubrica.findById(id);
        if (!rubricaFound) {
            return [null, "Rubrica no encontrada"];
        }
        const {
            nombre, criterios, puntajeMinimoAprobacion, puntajeMaximoAprobacion
        } = rubrica;

        const rubricaUpdated = await Rubrica.findByIdAndUpdate(
            id,
            {
                nombre,
                criterios,
                puntajeMinimoAprobacion,
                puntajeMaximoAprobacion,
            },
            {
                new: true,
            }
        );
        return [rubricaUpdated, null];
    }
    catch (error) {
        handleError(error, "rubrica.service -> updateRubrica");
    }
}

async function deleteRubrica(id) {
    try {
      const deletedRubrica = await Rubrica.findByIdAndDelete(id);

      if (!deletedRubrica) {
        return [null, 'Rúbrica no encontrada'];
      }

      return [deletedRubrica, null];
    } catch (error) {
      handleError(error, 'rubrica.service -> deleteRubrica');
      return [null, 'Error al eliminar Rúbrica'];
    }
  }

export const rubricaService = {
    getRubricas,
    getRubricaById,
    createRubrica,
    updateRubrica,
    deleteRubrica,
};