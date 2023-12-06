"use strict";

import { handleError } from "../utils/errorHandler.js";
import Criterio from "../models/criterio.model.js";

async function getCriterios() {
    try {
        const criterios = await Criterio.find();

        if (!criterios || criterios.length === 0) {
            return [[], "No hay criterios registrados"];
        }
        return [criterios, null];
    } catch (error) {
        handleError(error, "criterio.service -> getCriterios");
    }
}

async function getCriterioById(id) {
    try {
        const criterio = await Criterio.findById(id);
        if (!criterio) {
            return [null, "Criterio no encontrado"];
        }
        return [criterio, null];
    } catch (error) {
        handleError(error, "criterio.service -> getCriterioById");
    }
}

async function createCriterio(criterio) {
    try {
        const { nombre, descripcion, puntaje } = criterio;

        if (!nombre || !descripcion || !puntaje) {
            return [null, "Faltan datos obligatorios para crear el criterio"];
        }

        const criterioFound = await Criterio.findOne({ nombre });

        if (criterioFound) {
            return [null, "El criterio ya existe"];
        }
        const newCriterio = new Criterio({
            nombre,
            descripcion,
            puntaje,
        });
        await newCriterio.save();
        return [newCriterio, null];
    }
    catch (error) {
        handleError(error, "criterio.service -> createCriterio");
    }
}

async function updateCriterio(id, criterio) {
    try {
        const criterioFound = await Criterio.findById(id);
        if (!criterioFound) {
            return [null, "Criterio no encontrado"];
        }
        const { nombre, descripcion, puntaje } = criterio;

        const criterioUpdated = await Criterio.findByIdAndUpdate(
            id,
            {
                nombre,
                descripcion,
                puntaje,
            },
            {
                new: true,
            }
        );
        return [criterioUpdated, null];
    }
    catch (error) {
        handleError(error, "criterio.service -> updateCriterio");
    }
}

async function deleteCriterio(id) {
    try {
        return await Criterio.findByIdAndDelete(id);
    } catch (error) {
        handleError(error, "criterio.service -> deleteCriterio");
    }
}

async function updatePuntaje(id, puntaje) {
    try {
      const criterioFound = await Criterio.findById(id);
      if (!criterioFound) {
        return [null, "Criterio no encontrado"];
      }
      const updatedCriterio = await Criterio.findByIdAndUpdate(
        id,
        { puntaje: puntaje },
        { new: true }
      );

      if (!updatedCriterio) {
        return [null, "Criterio no encontrado"];
      }

      return [updatedCriterio, null];
    } catch (error) {
      handleError(error, "criterio.service -> updateCriterio");
    }
  }

export const criterioService = {
    getCriterios,
    getCriterioById,
    createCriterio,
    updateCriterio,
    deleteCriterio,
    updatePuntaje,
};