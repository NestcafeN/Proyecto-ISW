"use strict";

import { handleError } from "../utils/errorHandler.js";
import Concurso from "../models/concurso.model.js";
import Fondo from "../models/fondo.model.js";

async function getConcursos() {
  try {
    const concursos = await Concurso.find().populate("postulaciones").exec();

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
    const concurso = await Concurso.findById(id)
      .populate("postulaciones")
      .exec();
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
      estado,
      postulaciones,
      fondo,
      fechaAperturaConcurso,
      fechaCierreConcurso,
      fechaAnuncioGanadores,
    } = concurso;

    const concursoFound = await Concurso.findOne({ nombre });
    if (concursoFound) {
      return [null, "El concurso ya existe"];
    }
    const newConcurso = new Concurso({
      nombre,
      estado,
      postulaciones,
      fondo,
      fechaAperturaConcurso,
      fechaCierreConcurso,
      fechaAnuncioGanadores,
    });
    await newConcurso.save();
    return [newConcurso, null];
  } catch (error) {
    handleError(error, "concurso.service -> createConcurso");
  }
}

async function addFondoId(id, fondo) {
  try {
    const concursoFound = await Concurso.findById(id);
    if (!concursoFound) {
      return [null, "Concurso no encontrado"];
    }
    const updatedConcurso = await Concurso.findByIdAndUpdate(
      id,
      { fondo },
      { new: true }
    );
    if (!updatedConcurso) {
      return [null, "Concurso no encontrado"];
    }

    return [updatedConcurso, null];
  } catch (error) {
    handleError(error, "concurso.service -> updateConcurso");
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
      estado,
      postulaciones,
      fondo,
      fechaAperturaConcurso,
      fechaCierreConcurso,
      fechaAnuncioGanadores,
    } = concurso;
    const concursoUpdated = await Concurso.findByIdAndUpdate(
      id,
      {
        nombre,
        estado,
        postulaciones,
        fondo,
        fechaAperturaConcurso,
        fechaCierreConcurso,
        fechaAnuncioGanadores,
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


async function deleteFondoId(idConcurso, idFondo) {
  try {
    const concursoFound = await Concurso.findById(idConcurso);
    if (!concursoFound) {
      return [null, "Concurso no encontrado"];
    }
    const fondoFound = await Fondo.findById(idFondo);
    if (!fondoFound) {
      return [null, "Fondo no encontrado"];
    }
    const updatedConcurso = await Concurso.findByIdAndUpdate(
      idConcurso,
      { $pull: { fondo: idFondo } },
      { new: true }
    );

    const concursoUpdated = await concursoFound.save();

    return [concursoUpdated, null];
  } catch (error) {
    handleError(error, "concurso.service -> deleteFondoId");
  }
}

export const concursoService = {
  getConcursos,
  getConcursoById,
  createConcurso,
  addFondoId,
  updateConcurso,
  deleteConcurso,
  deleteFondoId,
};
