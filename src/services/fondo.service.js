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
    const { nombre, descripcion, tipo, monto, fechaApertura, fechaCierre } =
      fondo;

    const fondoFound = await Fondo.findOne({ nombre });
    if (fondoFound) {
      return [null, "El fondo ya existe"];
    }
    const newFondo = new Fondo({
      nombre,
      descripcion,
      tipo,
      monto,
      fechaApertura,
      fechaCierre,
    });
    await newFondo.save();
    return [newFondo, null];
  } catch (error) {
    handleError(error, "fondo.service -> createFondo");
  }
}

async function updateFondo(id, fondo) {
  try {
    const fondoFound = await Fondo.findById(id);
    if (!fondoFound) {
      return [null, "Fondo no encontrado"];
    }
    const { nombre, descripcion, tipo, monto, fechaApertura, fechaCierre } =
      fondo;
    const fondoUpdated = await Fondo.findByIdAndUpdate(
      id,
      {
        nombre,
        descripcion,
        tipo,
        monto,
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

export const fondoService = {
  getFondos,
  getFondoById,
  createFondo,
  updateFondo,
  deleteFondo,
};
