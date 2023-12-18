"use strict";

import { handleError } from "../utils/errorHandler.js";
import { Postulacion } from "../models/postulacion.model.js";

async function getPostulaciones() {
  try {
    const postulaciones = await Postulacion.find();

    if (!postulaciones) {
      return [null, "No hay postulaciones registradas"];
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
    const { nombreCompleto, rut, correo, concurso, direccion, proyecto, estado, fechaPostulacion } = postulacion;

    const newPostulacion = new Postulacion({
      nombreCompleto,
      rut,
      correo,
      concurso,
      direccion,
      proyecto,
      estado,
      fechaPostulacion,
    });

    // Guardar la nueva postulación
    await newPostulacion.save();

    // Retornar la nueva postulación creada
    return [newPostulacion, null];
  } catch (error) {
    handleError(error, "postulacion.service -> createPostulacion");
    return [null, "Error al crear la postulación"];
  }
}

async function updatePostulacion(id, postulacion) {
  try {
    const updatedPostulacion = await Postulacion.findByIdAndUpdate(id, postulacion, { new: true });
    return [updatedPostulacion, null];
  } catch (error) {
    handleError(error, "postulacion.service -> updatePostulacion");
    return [null, "No se pudo actualizar la postulación"];
  }
}

async function deletePostulacion(id) {
  try {
    const deletedPostulacion = await Postulacion.findByIdAndDelete(id);
    return deletedPostulacion;
  } catch (error) {
    handleError(error, "postulacion.service -> deletePostulacion");
    return null;
  }
}

async function updateEstadoPostulacion(id, estado) {
  try {
    const updatedPostulacion = await Postulacion.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!updatedPostulacion) {
      return [null, "Postulación no encontrada"];
    }

    return [updatedPostulacion, null];
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
  updateEstadoPostulacion
};

