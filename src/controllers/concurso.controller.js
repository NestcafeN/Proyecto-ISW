"use strict";

import concursoService from "../services/concurso.service.js";
import handleError from "../utils/errorHandler.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { concursoSchema } from "../schemas/concurso.schema.js";

export async function getConcursos(req, res) {
      try {
            const [concursos, errorConcursos] = await concursoService.getConcursos();
            if (errorConcursos) {
                  return respondError(req, res, 404, errorConcursos);
            }
            concursos.length === 0
                  ? respondSuccess(req, res, 204)
                  : respondSuccess(req, res, 200, concursos);
      } catch (error) {
            handleError(error, "concurso.controller -> getConcursos");
            respondError(req, res, 400, error.message);
      }
}

export async function getConcursoById(req, res) {
      try {
            const { params } = req;
            const { error: paramsError } = concursoSchema.validate(params);
            if (paramsError) {
                  return respondError(req, res, 400, paramsError.message);
            }

            const [concurso, errorConcurso] = await concursoService.getConcursoById(params.id);
            if (errorConcurso) {
                  return respondError(req, res, 404, errorConcurso);
            }
            respondSuccess(req, res, 200, concurso);
      } catch (error) {
            handleError(error, "concurso.controller -> getConcursoById");
            respondError(req, res, 500, "No se pudo obtener el concurso");
      }
}

export async function createConcurso(req, res) {
      try {
            const {body} = req;
            const {error: bodyError } = concursoSchema.validate(body);
            if (bodyError) {
                  return respondError(req, res, 400, bodyError.message);
            }
            const [newConcurso, errorConcurso] = await concursoService.createConcurso(body);
            if (errorConcurso) {
                  return respondError(req, res, 400, errorConcurso);
            }
            if (!newConcurso) {
                  return respondError(req, res, 400, "No se pudo crear el concurso");
            }
            respondSuccess(req, res, 201, newConcurso);
      } catch (error) {
            handleError(error, "concurso.controller -> createConcurso");
            respondError(req, res, 500, "No se pudo crear el concurso");
      }
}

export async function updateConcurso(req, res) {
      try{
            const {body, params} = req;
            const {error: bodyError} = concursoSchema.validate(body);
            const {error: paramsError} = concursoSchema.validate(params);
            if (bodyError || paramsError) {
                  return respondError(req, res, 400, bodyError.message || paramsError.message);
            }
            const [updatedConcurso, errorConcurso] = await concursoService.updateConcurso(params.id, body);
            if (errorConcurso) {
                  return respondError(req, res, 400, errorConcurso);
            }
            if (!updatedConcurso) {
                  return respondError(req, res, 400, "No se pudo actualizar el concurso");
            }
            respondSuccess(req, res, 200, updatedConcurso);

      } catch (error) {
            handleError(error, "concurso.controller -> updateConcurso");
            respondError(req, res, 500, "No se pudo actualizar el concurso");
      }
}

export async function deleteConcurso(req, res) {
      try {
            const {params} = req;
            const {error: paramsError} = concursoSchema.validate(params);
            if (paramsError) {
                  return respondError(req, res, 400, paramsError.message);
            }
            const [deleteConcurso, errorConcurso] = await concursoService.deleteConcurso(params.id);
            if (errorFondo) {
                  return respondError(req, res, 400, errorConcurso);
            }
            if (!deleteConcurso){
                  return respondError(req, res, 400, "No se pudo eliminar el concurso");
            }
            respondSuccess(req, res, 200, deleteConcurso);

      } catch (error) {
            handleError(error, "concurso.controller -> deleteConcurso");
            respondError(req, res, 500, "No se pudo eliminar el concurso");
      }
}