"use strict";

const fondoBodySchema = require("../schemas/fondo.schema");
const { handleError } = require("../utils/errorHandler");

export async function getFondos(req, res) {
      try {
            const fondos = await Fondo.find();

            if (!fondos) {
                  return [null, "No hay fondos registrados"];
            }
            return [fondos, null];
      } catch (error) {
            handleError(error, "fondo.service -> getFondos");
      }
}

export async function getFondoById(req, res) {
      try {
            const fondo = await Fondo.findById(req.params.id);
            if (!fondo) {
                  return [null, "Fondo no encontrado"];
            }
            return [fondo, null];
      } catch (error) {
            handleError(error, "fondo.service -> getFondoById");
      }
}

export async function createFondo(req, res) {
      try {
            const { nombre, descripcion, tipo, estado, postulaciones,
                  fechaAperturaFondo, fechaCierreFondo, fechaAnuncioGanador } = fondo;

            const fondoFound = await Fondo.findOne({ nombre: fondo.nombre });
            if (fondoFound) {
                  return [null, "El fondo ya existe"];
            }
            const newFondo = new Fondo({
                  nombre,
                  descripcion,
                  tipo,
                  estado,
                  postulaciones,
                  fechaAperturaFondo,
                  fechaCierreFondo,
                  fechaAnuncioGanador
            });
            await newFondo.save();
            return [newFondo, null];
      } catch (error) {
            handleError(error, "fondo.service -> createFondo");
      }
}

export async function updateFondo(req, res) {
      try {
            const fondoFound = await Fondo.findById(req.params.id);
            if (!fondoFound) {
                  return [null, "Fondo no encontrado"];
            }
            const { nombre, descripcion, tipo, estado, postulaciones,
                  fechaAperturaFondo, fechaCierreFondo, fechaAnuncioGanador } = fondo;
            const fondoUpdated = await Fondo.findByIdAndUpdate(req.params.id, {
                  nombre,
                  descripcion,
                  tipo,
                  estado,
                  postulaciones,
                  fechaAperturaFondo,
                  fechaCierreFondo,
                  fechaAnuncioGanador
            }, {
                  new: true
            });
            await fondoUpdated.save();
            return [fondoUpdated, null];
      } catch (error) {
            handleError(error, "fondo.service -> updateFondo");
      }
}

export async function deleteFondo(req, res) {
      try {
            return await Fondo.findByIdAndDelete(req.params.id);
      } catch (error) {
            handleError(error, "fondo.service -> deleteFondo");
      }
}