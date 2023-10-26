import Joi from 'joi';

const criterioBodySchema = Joi.object({
  nombre: Joi.string().trim().required().messages({
    "string.empty": "El nombre del criterio no puede estar vacío",
    "any.required": "El nombre del criterio es obligatorio",
    "string.base": "El nombre del criterio debe ser de tipo string",
  }),
  descripcion: Joi.string().trim().required().messages({
    "string.empty": "La descripción del criterio no puede estar vacía",
    "any.required": "La descripción del criterio es obligatoria",
    "string.base": "La descripción del criterio debe ser de tipo string",
  }),
  puntaje: Joi.number().required().messages({
    "number.base": "El puntaje del criterio debe ser de tipo numérico",
    "any.required": "El puntaje del criterio es obligatorio",
  }),
});

const criterioIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El ID del criterio no puede estar vacío.",
      "any.required": "El ID del criterio es obligatorio.",
      "string.base": "El ID del criterio debe ser de tipo string.",
      "string.pattern.base": "El ID proporcionado no es un ObjectId válido.",
    }),
});

export { criterioBodySchema, criterioIdSchema };
