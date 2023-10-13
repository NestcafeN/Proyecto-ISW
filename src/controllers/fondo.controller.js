"use strict";

import fondoService from "../services/fondo.service.js";
import handleError from "../utils/errorHandler.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { fondoSchema } from "../schemas/fondo.schema.js";

export async function getFondos(req, res) {
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

export async function getFondoById(req, res) {
      try {
            const { params } = req;
            const { error: paramsError } = fondoSchema.validate(params);
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

export async function createFondo(req, res) {
      try {
            const {body} = req;
            const {error: bodyError } = fondoSchema.validate(body);
            if (bodyError) {
                  return respondError(req, res, 400, bodyError.message);
            }
            const [newFondo, errorFondo] = await fondoService.createFondo(body);
            if (errorFondo) {
                  return respondError(req, res, 400, errorFondo);
            }
            if (!newFondo) {
                  return respondError(req, res, 400, "No se pudo crear el fondo");
            }
            respondSuccess(req, res, 201, newFondo);
      } catch (error) {
            handleError(error, "fondo.controller -> createFondo");
            respondError(req, res, 500, "No se pudo crear el fondo");
      }
}

export async function updateFondo(req, res) {
      try{
            const {body, params} = req;
            const {error: bodyError } = fondoSchema.validate(body);
            const {error: paramsError } = fondoSchema.validate(params);
            if (bodyError || paramsError) {
                  return respondError(req, res, 400, bodyError.message || paramsError.message);
            }
            const [updatedFondo, errorFondo] = await fondoService.updateFondo(params.id, body);
            if (errorFondo) {
                  return respondError(req, res, 400, errorFondo);
            }
            if (!updatedFondo) {
                  return respondError(req, res, 400, "No se pudo actualizar el fondo");
            }
            respondSuccess(req, res, 200, updatedFondo);
      } catch (error) {
            handleError(error, "fondo.controller -> updateFondo");
            respondError(req, res, 500, "No se pudo actualizar el fondo");
      }
}

export async function deleteFondo(req, res) {
      try {
            const { params } = req;
            const { error: paramsError } = fondoSchema.validate(params);
            if (paramsError) {
                  return respondError(req, res, 400, paramsError.message);
            }
            const [deletedFondo, errorFondo] = await fondoService.deleteFondo(params.id);
            if (errorFondo) {
                  return respondError(req, res, 400, errorFondo);
            }
            if (!deletedFondo) {
                  return respondError(req, res, 400, "No se pudo eliminar el fondo");
            }
            respondSuccess(req, res, 200, deletedFondo);
      } catch (error) {
            handleError(error, "fondo.controller -> deleteFondo");
            respondError(req, res, 500, "No se pudo eliminar el fondo");
      }
}