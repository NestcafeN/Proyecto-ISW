"use strict";

import { handleError } from "../utils/errorHandler.js";
import Concurso from "../models/concurso.model.js";

async function getConcursos() {
  try {
    const concursos = await Concurso.find();

    if (!concursos) {
      return [[], "No hay concursos registrados"];
    }
    return [concursos, null];
  } catch (error) {
    handleError(error, "fondo.service -> getConcursos");
  }
}

async function getConcursoById(id) {
  try {
    const concurso = await Concurso.findById(id);
    if (!concurso) {
      return [null, "Concurso no encontrado"];
    }
    return [concurso, null];
  } catch (error) {
    handleError(error, "concurso.service -> getConcursoById");
  }
}

async function createConcurso(concurso) {
  try {
    const {
      nombre,
      descripcion,
      tipo,
      estado,
      postulaciones,
      fechaAperturaConcurso,
      fechaCierreConcurso,
      fechaAnuncioGanador,
    } = concurso;

    const concursoFound = await Concurso.findOne({ nombre });
    if (concursoFound) {
      return [null, "El concurso ya existe"];
    }
    const newConcurso = new Concurso({
      nombre,
      descripcion,
      tipo,
      estado,
      postulaciones,
      fechaAperturaConcurso,
      fechaCierreConcurso,
      fechaAnuncioGanador,
    });
    await newConcurso.save();
    return [newConcurso, null];
  } catch (error) {
    handleError(error, "concurso.service -> createConcurso");
  }
}

async function updateConcurso(id, concurso) {
  try {
    const concursoFound = await Concurso.findById(id);
    if (!concursoFound) {
      return [null, "Concurso no encontrado"];
    }
    const {
      nombre,
      descripcion,
      tipo,
      estado,
      postulaciones,
      fechaAperturaConcurso,
      fechaCierreConcurso,
      fechaAnuncioGanador,
    } = concurso;
    const concursoUpdated = await Concurso.findByIdAndUpdate(
      id,
      {
        nombre,
        descripcion,
        tipo,
        estado,
        postulaciones,
        fechaAperturaConcurso,
        fechaCierreConcurso,
        fechaAnuncioGanador,
      },
      {
        new: true,
      }
    );
    return [concursoUpdated, null];
  } catch (error) {
    handleError(error, "concurso.service -> updateConcurso");
  }
}

async function deleteConcurso(id) {
  try {
    return await Concurso.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "concurso.service -> deleteConcurso");
  }
}

export const concursoService = {
  getConcursos,
  getConcursoById,
  createConcurso,
  updateConcurso,
  deleteConcurso,
};
