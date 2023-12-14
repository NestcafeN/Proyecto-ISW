"use strict";
import mongoose from "mongoose";
const { Schema } = mongoose;

const fondoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 150,
      validate: {
        validator: function (value) {
          const caracteresPermitidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s&_-]+$/;
          const caracteresInvalidos = /[#$%!|¬?¡¿()=><.;,:~*+/{}[\]^`]+/;

          if (
            !caracteresPermitidos.test(value) ||
            caracteresInvalidos.test(value)
          ) {
            return false;
          }

          return true;
        },
        message: "Formato de nombre no válido",
      },
    },
    descripcion: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 700,
      validate: {
        validator: function (value) {
          const caracteresPermitidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s,.()&:;]+$/;
          const space = /^.*\s.*\s.*$/;

          return caracteresPermitidos.test(value) && space.test(value);
        },
        message:
          "La descripción debe contener al menos dos partes separadas por un espacio y solo debe contener caracteres permitidos",
      },
    },
    categoria: [
      {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
      },
    ],
    montoMax: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000000,
    },
    fechaApertura: {
      type: Date,
      required: true,
      validate: {
        validator: function (fechaApertura) {
          return fechaApertura >= Date.now();
        },
        message: "La fecha de apertura no puede ser anterior a la fecha actual",
      },
    },
    fechaCierre: {
      type: Date,
      required: true,
      validate: {
        validator: function (fechaCierre) {
          return fechaCierre > this.fechaApertura;
        },
        message: "La fecha de cierre debe ser posterior a la fecha de apertura",
      },
      validate: {
        validator: function (fechaCierre) {
          // Verificar que la fecha de cierre sea al menos una semana después de la fecha de apertura
          const unaSemanaDespues = new Date(this.fechaApertura);
          unaSemanaDespues.setDate(unaSemanaDespues.getDate() + 7);
          return fechaCierre >= unaSemanaDespues;
        },
        message:
          "La fecha de cierre debe ser al menos una semana después de la fecha de apertura",
      },
    },
  },
  {
    versionKey: false,
  }
);

export const Fondo = mongoose.model("Fondo", fondoSchema);
export default Fondo;
