"use strict";

import Joi from "joi";

const concursoBodySchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre del concurso no puede estar vacio",
    "any.required": "El nombre del concurso es obligatorio",
    "string base": "El nombre del concurso debe ser de tipo string",
  }),
  estado: Joi.string().required().messages({
    "string.empty": "El estado del concurso no puede estar vacio",
    "any.required": "El estado del concurso es obligatorio",
    "string base": "El estado del concurso debe ser de tipo string",
  }),
  postulaciones: Joi.array().required().messages({
    "array.empty":
      "El numero de postulaciones del concurso no puede estar vacio",
    "any.required": "El numero de postulaciones del concurso es obligatorio",
  }),
  fechaAperturaConcurso: Joi.date().required().messages({
    "date.empty": "La fecha de apertura del concurso no puede estar vacia",
    "any.required": "La fecha de apertura del concurso es obligatoria",
    "date base": "La fecha de apertura del concurso debe ser de tipo date",
  }),
  fechaCierreConcurso: Joi.date().required().messages({
    "date.empty": "La fecha de cierre del concurso no puede estar vacia",
    "any.required": "La fecha de cierre del concurso es obligatoria",
    "date base": "La fecha de cierre del concurso debe ser de tipo date",
  }),
  fechaAnuncioGanadores: Joi.date().required().messages({
    "date.empty":
      "La fecha de anuncio de los ganadores del concurso no puede estar vacia",
    "any.required":
      "La fecha de anuncio de los ganadores del concurso es obligatoria",
    "date base":
      "La fecha de anuncio de los ganadores del concurso debe ser de tipo date",
  }),
});

const concursoIdSchema = Joi.object({
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

export { concursoBodySchema, concursoIdSchema };
