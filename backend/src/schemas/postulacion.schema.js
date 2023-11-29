"use strict";

import Joi from "joi";


const postulacionBodySchema = Joi.object({
  nombreCompleto: Joi.string().required().messages({
    "string.empty": "El nombre completo no puede estar vacío.",
    "any.required": "El nombre completo es obligatorio.",
    "string.base": "El nombre completo debe ser de tipo string.",
    "string.pattern.base": "El nombre completo no puede contener solo espacios en blanco.",
    "string.max": "El nombre completo debe tener como máximo 30 caracteres.",
  }),
  rut: Joi.string()
    .required()
    .regex(/^[0-9]{7,8}[Kk]?$/)
    .messages({
      "string.empty": "El RUT no puede estar vacío.",
      "any.required": "El RUT es obligatorio.",
      "string.base": "El RUT debe ser de tipo string.",
      "string.pattern.base": "El RUT proporcionado no es válido.",
    }),
  correo: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "El correo no puede estar vacío.",
      "any.required": "El correo es obligatorio.",
      "string.base": "El correo debe ser de tipo string.",
      "string.email": "El correo debe tener un formato válido.",
    }),
  direccion: Joi.string().required().messages({
    "string.empty": "La dirección no puede estar vacía.",
    "any.required": "La dirección es obligatoria.",
    "string.base": "La dirección debe ser de tipo string.",
  }),
  proyecto: Joi.string().required().messages({
    "string.empty": "El nombre del proyecto no puede estar vacío.",
    "any.required": "El nombre del proyecto es obligatorio.",
    "string.base": "El nombre del proyecto debe ser de tipo string.",
  }),
  documentos: Joi.array()
  .items(Joi.binary()
    .encoding("base64")
    .min(1)
    .required()
    .messages({
      "binary.base": "El documento debe ser de tipo binario.",
      "binary.min": "Debe adjuntar al menos un documento.",
      "any.required": "Los documentos son obligatorios.",
    })
  ),
  estado: Joi.string().default("ER")
    .valid("R", "r", "A", "a", "ER", "er", "eR", "Er", "er")
    .required()
    .messages({
      "any.only": "El estado debe ser 'R', 'A' o 'ER' en mayúsculas o minúsculas.",
      "any.required": "El estado es obligatorio.",
      "string.base": "El estado debe ser de tipo string.",
    }),
  fechaPostulacion: Joi.date().required().messages({
    "date.empty": "La fecha de postulación no puede estar vacía.",
    "any.required": "La fecha de postulación es obligatoria.",
    "date.base": "La fecha de postulación debe ser de tipo date.",
  }),
});

const postulacionIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El ID no puede estar vacío.",
      "any.required": "El ID es obligatorio.",
      "string.base": "El ID debe ser de tipo string.",
      "string.pattern.base": "El ID proporcionado no es válido.",
    }),
});

export { postulacionBodySchema, postulacionIdSchema };