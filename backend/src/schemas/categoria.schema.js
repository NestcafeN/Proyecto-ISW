"use strict";
import Joi from "joi";

const categoriaBodySchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre de la categoria no puede estar vacio",
    "any.required": "El nombre de la categoria es obligatorio",
    "string base": "El nombre de la categoria debe ser de tipo string",
  }),
});

const categoriaIdSchema = Joi.object({
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

export { categoriaBodySchema, categoriaIdSchema };
