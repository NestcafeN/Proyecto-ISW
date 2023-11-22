"use strict";

import Joi from "joi";

const fondoBodySchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre del fondo no puede estar vacio",
    "any.required": "El nombre del fondo es obligatorio",
    "string base": "El nombre del fondo debe ser de tipo string",
  }),
  descripcion: Joi.string().required().messages({
    "string.empty": "La descripcion del fondo no puede estar vacia",
    "any.required": "La descripcion del fondo es obligatoria",
    "string base": "La descripcion del fondo debe ser de tipo string",
  }),
  categoria: Joi.string().required().messages({
    "string.empty": "La categoria del fondo no puede estar vacio",
    "any.required": "La categoria del fondo es obligatorio",
    "string base": "La categoria del fondo debe ser de tipo string",
  }),
  montoMax: Joi.number().required().messages({
    "number.empty": "El montoMax del fondo no puede estar vacio",
    "any.required": "El montoMax del fondo es obligatorio",
    "number base": "El montoMax del fondo debe ser de tipo numero",
  }),
  fechaApertura: Joi.date().required().messages({
    "date.empty": "La fecha de apertura del fondo no puede estar vacia",
    "any.required": "La fecha de apertura del fondo es obligatoria",
    "date base": "La fecha de apertura del fondo debe ser de tipo date",
  }),
  fechaCierre: Joi.date().required().messages({
    "date.empty": "La fecha de cierre del fondo no puede estar vacia",
    "any.required": "La fecha de cierre del fondo es obligatoria",
    "date base": "La fecha de cierre del fondo debe ser de tipo date",
  }),
  concursos: Joi.array().required().messages({
    "array.empty": "El id del concurso no puede estar vacio",
    "any.required": "El id del concurso es obligatorio",
    "array base": "El id del concurso debe ser de tipo string",
  }),
});

const fondoIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

export { fondoBodySchema, fondoIdSchema };
