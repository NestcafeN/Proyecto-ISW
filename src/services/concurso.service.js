"use strict";

const concursoBodySchema = require("../schemas/concurso.schema");
const { handleError } = require("../utils/errorHandler");

export async function getConcursos(req, res) {
      try {
            const concursos = await Concurso.find();

            if (!concursos) {
                  return [null, "No hay concursos registrados"];
            }
            return [concursos, null];
      } catch (error) {
            handleError(error, "fondo.service -> getConcursos");
      }
}

export async function getConcursoById (req, res) {
      try {
            const concurso = await Concurso.findById(req.params.id);
            if (!concurso) {
                  return [null, "Concurso no encontrado"];
            }
            return [concurso, null];
      } catch (error) {
            handleError(error, "concurso.service -> getConcursoById");
      }
}

export async function createConcurso (req, res) {
      try {
            const {nombre, descripcion, tipo, estado, postulaciones, 
            fechaAperturaConcurso, fechaCierreConcurso, fechaAnuncioGanador} = concurso;

            const concursoFound = await Concurso.findOne({nombre: concurso.nombre});
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
                  fechaAnuncioGanador
            });
            await newConcurso.save();
            return [newConcurso, null];
      } catch (error) {
            handleError(error, "concurso.service -> createConcurso");
      }
}

export async function updateConcurso (req, res) {
      try {
            const concursoFound = await Concurso.findById(req.params.id);
            if (!concursoFound) {
                  return [null, "Concurso no encontrado"];
            }
            const {nombre, descripcion, tipo, estado, postulaciones, 
                  fechaAperturaConcurso, fechaCierreConcurso, fechaAnuncioGanador} = concurso;
            const concursoUpdated = await Concurso.findByIdAndUpdate(req.params.id, {
                  nombre,
                  descripcion,
                  tipo,
                  estado,
                  postulaciones,
                  fechaAperturaConcurso,
                  fechaCierreConcurso,
                  fechaAnuncioGanador
            }, {
                  new: true
            });
            await concursoUpdated.save();
            return [concursoUpdated, null];
      } catch (error) {
            handleError(error, "concurso.service -> updateConcurso");
      }
}

export async function deleteConcurso (req, res) {
      try {
            return await Concurso.findByIdAndDelete(req.params.id);
      } catch (error) {
            handleError(error, "concurso.service -> deleteConcurso");
      }
}

