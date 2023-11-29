"use strict";

import { handleError } from "../utils/errorHandler.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { postulacionBodySchema, postulacionIdSchema } from "../schemas/postulacion.schema.js";
import { postulacionService } from "../services/postulacion.service.js";

async function getPostulaciones(req, res) {
  try {
    const [postulaciones, errorPostulaciones] = await postulacionService.getPostulaciones();
    if (errorPostulaciones) {
      return respondError(req, res, 404, errorPostulaciones);
    }
    postulaciones.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, postulaciones);
  } catch (error) {
    handleError(error, "postulacion.controller -> getPostulaciones");
    respondError(req, res, 400, error.message);
  }
}

async function getPostulacionById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = postulacionIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const [postulacion, errorPostulacion] = await postulacionService.getPostulacionById(params.id);
    if (errorPostulacion) {
      return respondError(req, res, 404, errorPostulacion);
    }
    respondSuccess(req, res, 200, postulacion);
  } catch (error) {
    handleError(error, "postulacion.controller -> getPostulacionById");
    respondError(req, res, 500, "No se pudo obtener la postulación");
  }
}

async function createPostulacion(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = postulacionBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }
    const [newPostulacion, errorPostulacion] = await postulacionService.createPostulacion(body);
    if (errorPostulacion) {
      return respondError(req, res, 400, errorPostulacion);
    }
    if (newPostulacion) {
      return respondSuccess(req, res, 201, newPostulacion);
    } else {
      return respondError(req, res, 400, "No se pudo crear la postulación");
    }
  } catch (error) {
    handleError(error, "postulacion.controller -> createPostulacion");
    respondError(req, res, 500, "No se pudo crear la postulación");
  }
}

async function updatePostulacion(req, res) {
  try {
    const { body, params } = req;
    const { error: paramsError } = postulacionIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const { id } = params;
    const { nombreCompleto, rut, correo, direccion, proyecto, fechaPostulacion } = body;
    const updatedPostulacion = await postulacionService.updatePostulacion(id, {
      nombreCompleto,
      rut,
      correo,
      direccion,
      proyecto,
      fechaPostulacion,
    });

    if (!updatedPostulacion) {
      return respondError(req, res, 404, "Postulación no encontrada");
    }
    respondSuccess(req, res, 200, updatedPostulacion);
  } catch (error) {
    handleError(error, "postulacion.controller -> updatePostulacion");
    respondError(req, res, 500, "No se pudo actualizar la postulación");
  }
}

async function deletePostulacion(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = postulacionIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const deletedPostulacion = await postulacionService.deletePostulacion(params.id);
    if (!deletedPostulacion) {
      return respondError(req, res, 404, "Postulación no encontrada");
    }
    respondSuccess(req, res, 200, deletedPostulacion);
  } catch (error) {
    handleError(error, "postulacion.controller -> deletePostulacion");
    respondError(req, res, 500, "No se pudo eliminar la postulación");
  }
}

async function updateEstadoPostulacion(req, res) {
  try {
    const { body, params } = req;
    const { error: paramsError } = postulacionIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const { id } = params;
    const { estado } = body;

    const updatedPostulacion = await postulacionService.updateEstadoPostulacion(id, estado);

    if (!updatedPostulacion) {
      return respondError(req, res, 404, "Postulación no encontrada");
    }

    respondSuccess(req, res, 200, updatedPostulacion);
  } catch (error) {
    handleError(error, "postulacion.controller -> updateEstadoPostulacion");
    respondError(req, res, 500, "No se pudo actualizar el estado de la postulación");
  }
}

export {
  getPostulaciones,
  getPostulacionById,
  createPostulacion,
  updatePostulacion,
  deletePostulacion,
  updateEstadoPostulacion,
};