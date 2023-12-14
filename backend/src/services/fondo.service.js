"use strict";

import { handleError } from "../utils/errorHandler.js";
import Fondo from "../models/fondo.model.js";
import Categoria from "../models/categoria.model.js";
import Concurso from "../models/concurso.model.js";

async function getFondos() {
  try {
    const fondos = await Fondo.find()
      .populate("categoria")
      .exec();

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
    const fondo = await Fondo.findById(id)
      .populate("categoria")
      .exec();
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
async function addCategoriaId(id, categoria) {
  try {
    const fondoFound = await Fondo.findById(id);
    if (!fondoFound) {
      return [null, "Fondo no encontrado"];
    }
    const updatedFondo = await Fondo.findByIdAndUpdate(
      id,
      { categoria },
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


async function deleteCategoriaId(idFondo, idCategoria) {
  try {
    const fondoFound = await Fondo.findById(idFondo);
    if (!fondoFound) {
      return [null, "Fondo no encontrado"];
    }
    const categoriaFound = await Categoria.findById(idCategoria);
    if (!categoriaFound) {
      return [null, "Categoria no encontrada"];
    }
    const updatedFondo = await Fondo.findByIdAndUpdate(
      idFondo,
      { $pull: { categoria: idCategoria } },
      { new: true }
    );
    if (!updatedFondo) {
      return [null, "Fondo no encontrado"];
    }

    return [updatedFondo, null];
  } catch (error) {
    handleError(error, "fondo.service -> deleteCategoriaId");
  }
}

export const fondoService = {
  getFondos,
  getFondoById,
  createFondo,
  addCategoriaId,
  updateMontoMaximo,
  updateFondo,
  deleteFondo,
  deleteCategoriaId,
};
