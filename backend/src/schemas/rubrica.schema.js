import Joi from 'joi';
import { criterioBodySchema } from './criterio.schema.js';

const rubricaBodySchema = Joi.object({
  nombre: Joi.string().trim().required().messages({
    "string.empty": "El nombre de la rúbrica no puede estar vacío",
    "any.required": "El nombre de la rúbrica es obligatorio",
    "string.base": "El nombre de la rúbrica debe ser de tipo string",
  }),
  tipoFondo: Joi.string().required().messages({
    "string.empty": "El tipo de fondo de la rúbrica no puede estar vacío",
    "any.required": "El tipo de fondo de la rúbrica es obligatorio",
    "string.base": "El tipo de fondo de la rúbrica debe ser de tipo string",
  }),
  criterios: Joi.array()
    .min(1)
    .items(criterioBodySchema)
    .unique((a, b) => a.nombre === b.nombre)
    .messages({
      "array.unique": "No pueden existir criterios con el mismo nombre en una rúbrica",
      "array.min": "Debe existir al menos un criterio",
    }),
  puntajeMinimoAprobacion: Joi.number().required().messages({
    "number.base": "El puntaje mínimo de aprobación debe ser de tipo numérico",
    "any.required": "El puntaje mínimo de aprobación es obligatorio",
  }),
  puntajeMaximoAprobacion: Joi.number()
    .required()
    .min(Joi.ref('puntajeMinimoAprobacion'))
    .messages({
      "number.base": "El puntaje máximo de aprobación debe ser de tipo numérico",
      "any.required": "El puntaje máximo de aprobación es obligatorio",
      "number.min": "El puntaje máximo de aprobación debe ser mayor o igual al puntaje mínimo de aprobación",
    }),
});

const rubricaIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El ID de la rúbrica no puede estar vacío.",
      "any.required": "El ID de la rúbrica es obligatorio.",
      "string.base": "El ID de la rúbrica debe ser de tipo string.",
      "string.pattern.base": "El ID proporcionado no es un ObjectId válido.",
    }),
});

export { rubricaBodySchema, rubricaIdSchema };