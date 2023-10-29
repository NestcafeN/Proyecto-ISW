"use strict";

import { handleError } from "../utils/errorHandler.js";
import Fondo from "../models/fondo.model.js";

async function getFondos() {
  try {
    const fondos = await Fondo.find();

    if (!fondos) {
      return [null, "No hay fondos registrados"];
    }
    return [fondos, null];
  } catch (error) {
    handleError(error, "fondo.service -> getFondos");
  }
}

async function getFondoById(id) {
  try {
    const fondo = await Fondo.findById(id);
    if (!fondo) {
      return [null, "Fondo no encontrado"];
    }
    return [fondo, null];
  } catch (error) {
    handleError(error, "fondo.service -> getFondoById");
  }
}

async function createFondo(fondo) {
  try {
    const {
      nombre,
      descripcion,
      categoria,
      montoMax,
      fechaApertura,
      fechaCierre,
      concursos,
    } = fondo;

    const fondoFound = await Fondo.findOne({ nombre });
    if (fondoFound) {
      return [null, "El fondo ya existe"];
    }
    const newFondo = new Fondo({
      nombre,
      descripcion,
      categoria,
      montoMax,
      fechaApertura,
      fechaCierre,
      concursos,
    });
    await newFondo.validate();
    await newFondo.save();
    return [newFondo, null];
  } catch (error) {
    // Procesa el error de validación de Mongoose para obtener los mensajes de error
    if (error.errors) {
      const validationErrors = {};
      for (const key in error.errors) {
        if (error.errors.hasOwnProperty(key)) {
          validationErrors[key] = error.errors[key].message;
        }
      }
      return [null, validationErrors];
    } else {
      handleError(error, "fondo.service -> createFondo");
    }
  }
}

async function updateIdConcurso(id, concursos) {
  try {
    const fondoFound = await Fondo.findById(id);
    if (!fondoFound) {
      return [null, "Fondo no encontrado"];
    }
    const updatedFondo = await Fondo.findByIdAndUpdate(
      id,
      { concursos },
      { new: true }
    );
    if (!updatedFondo) {
      return [null, "Fondo no encontrado"];
    }

    return [updatedFondo, null];
  } catch (error) {
    handleError(error, "fondo.service -> updateFondo");
  }
}

async function updateMontoMaximo(id, montoMaximo) {
  try {
    const fondoFound = await Fondo.findById(id);
    if (!fondoFound) {
      return [null, "Fondo no encontrado"];
    }
    const updatedFondo = await Fondo.findByIdAndUpdate(
      id,
      { montoMax: montoMaximo },
      { new: true }
    );

    if (!updatedFondo) {
      return [null, "Fondo no encontrado"];
    }

    return [updatedFondo, null];
  } catch (error) {
    handleError(error, "fondo.service -> updateFondo");
  }
}

async function updateFondo(id, fondo) {
  try {
    const fondoFound = await Fondo.findById(id);
    if (!fondoFound) {
      return [null, "Fondo no encontrado"];
    }
    const {
      nombre,
      descripcion,
      categoria,
      montoMax,
      fechaApertura,
      fechaCierre,
      concursos,
    } = fondo;
    const fondoUpdated = await Fondo.findByIdAndUpdate(
      id,
      {
        nombre,
        descripcion,
        categoria,
        montoMax,
        fechaApertura,
        fechaCierre,
        concursos,
      },
      {
        new: true,
      }
    );
    return [fondoUpdated, null];
  } catch (error) {
    handleError(error, "fondo.service -> updateFondo");
  }
}

async function deleteFondo(id) {
  try {
    return await Fondo.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "fondo.service -> deleteFondo");
  }
}

export const fondoService = {
  getFondos,
  getFondoById,
  createFondo,
  updateIdConcurso,
  updateMontoMaximo,
  updateFondo,
  deleteFondo,
};
