"use strict";

import { handleError } from "../utils/errorHandler.js";
import Postulacion from "../models/postulacion.model.js";

async function getPostulaciones() {
  try {
    const postulaciones = await Postulacion.find();
    if (!postulaciones) {
      return [[], "No hay postulaciones registradas"];
    }
    return [postulaciones, null];
  } catch (error) {
    handleError(error, "postulacion.service -> getPostulaciones");
  }
}

async function getPostulacionById(id) {
  try {
    const postulacion = await Postulacion.findById(id);
    if (!postulacion) {
      return [null, "Postulación no encontrada"];
    }
    return [postulacion, null];
  } catch (error) {
    handleError(error, "postulacion.service -> getPostulacionById");
  }
}

async function createPostulacion(postulacion) {
  try {
    // Código para crear una nueva postulación
  } catch (error) {
    handleError(error, "postulacion.service -> createPostulacion");
  }
}

async function updatePostulacion(id, postulacion) {
  try {
    // Código para actualizar una postulación
  } catch (error) {
    handleError(error, "postulacion.service -> updatePostulacion");
  }
}

async function deletePostulacion(id) {
  try {
    // Código para eliminar una postulación
  } catch (error) {
    handleError(error, "postulacion.service -> deletePostulacion");
  }
}

async function updateEstadoPostulacion(id, nuevoEstado) {
  try {
    const postulacion = await Postulacion.findById(id);
    if (!postulacion) {
      return [null, "Postulación no encontrada"];
    }

    if (!["R", "A", "E"].includes(nuevoEstado.toUpperCase())) {
      return [null, "Estado no válido"];
    }

    postulacion.estado = nuevoEstado.toUpperCase();
    await postulacion.save();

    return [postulacion, null];
  } catch (error) {
    handleError(error, "postulacion.service -> updateEstadoPostulacion");
  }
}

export const postulacionService = {
  getPostulaciones,
  getPostulacionById,
  createPostulacion,
  updatePostulacion,
  deletePostulacion,
  updateEstadoPostulacion,
};