"use strict"

const Joi = require("joi");

const fondoBodySchema = Joi.object({
      nombre: Joi.string().required().messages({
            "string.empty": "El nombre del fondo no puede estar vacio",
            "any.required": "El nombre del fondo es obligatorio",
            "string base": "El nombre del fondo debe ser de tipo string"
      }),
      descripcion: Joi.string().required().messages({
            "string.empty": "La descripcion del fondo no puede estar vacia",
            "any.required": "La descripcion del fondo es obligatoria",
            "string base": "La descripcion del fondo debe ser de tipo string"
      }),
      tipo: Joi.string().required().messages({
            "string.empty": "El tipo del fondo no puede estar vacio",
            "any.required": "El tipo del fondo es obligatorio",
            "string base": "El tipo del fondo debe ser de tipo string"
      }),
      monto: Joi.number().required().messages({
            "number.empty": "El monto del fondo no puede estar vacio",
            "any.required": "El monto del fondo es obligatorio",
            "number base": "El monto del fondo debe ser de tipo numero"
      }),
      fechaApertura: Joi.date().required().messages({
            "date.empty": "La fecha de apertura del fondo no puede estar vacia",
            "any.required": "La fecha de apertura del fondo es obligatoria",
            "date base": "La fecha de apertura del fondo debe ser de tipo date"
      }),
      fechaCierre: Joi.date().required().messages({
            "date.empty": "La fecha de cierre del fondo no puede estar vacia",
            "any.required": "La fecha de cierre del fondo es obligatoria",
            "date base": "La fecha de cierre del fondo debe ser de tipo date"
      }),
      
});

module.exports = fondoBodySchema;