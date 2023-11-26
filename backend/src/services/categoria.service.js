"use strict";

import { handleError } from "../utils/errorHandler.js";
import Categoria from "../models/categoria.model.js";

async function getCategorias() {
  try {
    const categorias = await Categoria.find().exec();

    if (!categorias) {
      return [[], "No hay categorias registradas"];
    }
    return [categorias, null];
  } catch (error) {
    handleError(error, "categoria.service -> getCategorias");
  }
}

async function getCategoriaById(id) {
  try {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return [null, "Categoria no encontrada"];
    }
    return [categoria, null];
  } catch (error) {
    handleError(error, "categoria.service -> getCategoriaById");
  }
}

async function createCategoria(categoria) {
  try {
    const { nombre } = categoria;

    const categoriaFound = await Categoria.findOne({ nombre });
    if (categoriaFound) {
      return [null, "La categoria ya existe"];
    }
    const newCategoria = new Categoria({
      nombre,
    });
    await newCategoria.save();
    return [newCategoria, null];
  } catch (error) {
    handleError(error, "categoria.service -> createCategoria");
  }
}

async function updateCategoria(id, categoria) {
  try {
    const categoriaFound = await Categoria.findById(id);
    if (!categoriaFound) {
      return [null, "Categoria no encontrada"];
    }
    const { nombre } = categoria;
    const updatedCategoria = await Categoria.findByIdAndUpdate(id, {categoria}, {
      new: true,
    });
    return [updatedCategoria, null];
  } catch (error) {
    handleError(error, "categoria.service -> updateCategoria");
  }
}

async function deleteCategoria(id) {
  try {
    return await Categoria.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "categoria.service -> deleteCategoria");
  }
}

export const categoriaService = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
