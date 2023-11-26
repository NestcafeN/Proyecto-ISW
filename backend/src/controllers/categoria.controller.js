"use strict";

import { handleError } from "../utils/errorHandler.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import {
  categoriaBodySchema,
  categoriaIdSchema,
} from "../schemas/categoria.schema.js";
import { categoriaService } from "../services/categoria.service.js";

async function getCategorias(req, res) {
  try {
    const [categorias, errorCategorias] = await categoriaService.getCategorias(
      req,
      res
    );
    if (errorCategorias) {
      return respondError(req, res, 404, errorCategorias);
    }
    categorias.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, categorias);
  } catch (error) {
    handleError(error, "categoria.controller -> getCategorias");
    respondError(req, res, 400, error.message);
  }
}

async function getCategoriaById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = categoriaIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const [categoria, errorCategoria] = await categoriaService.getCategoriaById(
      params.id
    );
    if (errorCategoria) {
      return respondError(req, res, 404, errorCategoria);
    }
    respondSuccess(req, res, 200, categoria);
  } catch (error) {
    handleError(error, "categoria.controller -> getCategoriaById");
    respondError(req, res, 500, "No se pudo obtener la categoria");
  }
}

async function createCategoria(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = categoriaBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }
    const [newCategoria, errorCategoria] =
      await categoriaService.createCategoria(body);
    if (errorCategoria) {
      return respondError(req, res, 400, errorCategoria);
    }
    if (!newCategoria) {
      return respondError(req, res, 400, "No se pudo crear la categoria");
    }
    respondSuccess(req, res, 201, newCategoria);
  } catch (error) {
    handleError(error, "categoria.controller -> createCategoria");
    respondError(req, res, 500, "No se pudo crear la categoria");
  }
}

async function updateCategoria(req, res) {
  try {
    const { body, params } = req;
    const { error: bodyError } = categoriaBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }
    const updatedCategoria = await categoriaService.updateCategoria(
      params.id,
      body
    );
    if (!updatedCategoria) {
      return respondError(req, res, 400, "No se pudo actualizar la categoria");
    }
    respondSuccess(req, res, 200, updatedCategoria);
  } catch (error) {
    handleError(error, "categoria.controller -> updateCategoria");
    respondError(req, res, 500, "No se pudo actualizar la categoria");
  }
}

async function deleteCategoria(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = categoriaIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }
    const deletedCategoria = await categoriaService.deleteCategoria(params.id);
    if (!deletedCategoria) {
      return respondError(
        req,
        res,
        400,
        "No se pudo eliminar la categoria",
        "verifique el id ingresado"
      );
    }
    respondSuccess(req, res, 200, deletedCategoria);
  } catch (error) {
    handleError(error, "categoria.controller -> deleteCategoria");
    respondError(req, res, 500, "No se pudo eliminar la categoria");
  }
}

export const categoriaController = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
