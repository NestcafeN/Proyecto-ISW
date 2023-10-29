"use strict";

import { handleError } from "../utils/errorHandler.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { fondoBodySchema, fondoIdSchema } from "../schemas/fondo.schema.js";
import { fondoService } from "../services/fondo.service.js";

async function getFondos(req, res) {
  try {
    const [fondos, errorFondos] = await fondoService.getFondos();
    if (errorFondos) {
      return respondError(req, res, 404, errorFondos);
    }
    fondos.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, fondos);
  } catch (error) {
    handleError(error, "fondo.controller -> getFondos");
    respondError(req, res, 400, error.message);
  }
}

async function getFondoById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = fondoIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const [fondo, errorFondo] = await fondoService.getFondoById(params.id);
    if (errorFondo) {
      return respondError(req, res, 404, errorFondo);
    }
    respondSuccess(req, res, 200, fondo);
  } catch (error) {
    handleError(error, "fondo.controller -> getFondoById");
    respondError(req, res, 500, "No se pudo obtener el fondo");
  }
}

async function createFondo(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = fondoBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }
    const [newFondo, errorFondo] = await fondoService.createFondo(body);
    if (errorFondo) {
      return respondError(req, res, 400, errorFondo);
    }
    if (newFondo) {
      return respondSuccess(req, res, 201, newFondo);
    } else {
      if (errorFondo) {
        // Devuelve los mensajes de validación como respuesta
        return respondError(req, res, 400, "Error de validación", errorFondo);
      } else {
        return respondError(req, res, 400, "No se pudo crear el fondo");
      }
    }
  } catch (error) {
    handleError(error, "fondo.controller -> createFondo");
    respondError(req, res, 500, "No se pudo crear el fondo");
  }
}

async function updateIdConcurso(req, res) {
  try {
    const { body, params } = req;
    const { error: paramsError } = fondoIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const { id } = params;
    const { concursos } = body;
    const updatedFondo = await fondoService.updateIdConcurso(id, concursos);
    if (!updatedFondo) {
      return respondError(req, res, 404, "Fondo no encontrado");
    }
    respondSuccess(req, res, 200, updatedFondo);
  } catch (error) {
    handleError(error, "fondo.controller -> updateIdConcurso");
    respondError(req, res, 500, "No se pudo actualizar el id del concurso");
  }
}

async function updateMontoMaximo(req, res) {
  try {
    const { body, params } = req;
    const { error: paramsError } = fondoIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }
    const { id } = params;
    const { montoMax } = body;
    const updatedFondo = await fondoService.updateMontoMaximo(id, montoMax);

    if (!updatedFondo) {
      return respondError(req, res, 404, "Fondo no encontrado");
    }
    respondSuccess(req, res, 200, updatedFondo);
  } catch (error) {
    handleError(error, "fondo.controller -> updateMontoMaximo");
    respondError(
      req,
      res,
      500,
      "No se pudo actualizar el monto máximo del fondo"
    );
  }
}

async function updateFondo(req, res) {
  try {
    const { body, params } = req;
    const { error: bodyError } = fondoBodySchema.validate(body);
    const { error: paramsError } = fondoIdSchema.validate(params);
    if (bodyError || paramsError) {
      return respondError(
        req,
        res,
        400,
        bodyError.message || paramsError.message
      );
    }
    const updatedFondo = await fondoService.updateFondo(params.id, body);
    if (!updatedFondo) {
      return respondError(req, res, 400, "No se pudo actualizar el fondo");
    }
    respondSuccess(req, res, 200, updatedFondo);
  } catch (error) {
    handleError(error, "fondo.controller -> updateFondo");
    respondError(req, res, 500, "No se pudo actualizar el fondo");
  }
}

async function deleteFondo(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = fondoIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }
    const deletedFondo = await fondoService.deleteFondo(params.id);
    !deletedFondo
      ? respondError(
          req,
          res,
          400,
          "No se pudo eliminar el fondo",
          "Verifique el id ingresado"
        )
      : respondSuccess(req, res, 200, deletedFondo);
  } catch (error) {
    handleError(error, "fondo.controller -> deleteFondo");
    respondError(req, res, 500, "No se pudo eliminar el fondo");
  }
}

export const fondoController = {
  getFondos,
  getFondoById,
  createFondo,
  updateIdConcurso,
  updateMontoMaximo,
  updateFondo,
  deleteFondo,
};
