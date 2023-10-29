"use strict";
import mongoose from "mongoose";
const { Schema } = mongoose;

const fondoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    montoMax: {
      type: Number,
      required: true,
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
    },
    concursos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Concurso",
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const Fondo = mongoose.model("Fondo", fondoSchema);
export default Fondo;
