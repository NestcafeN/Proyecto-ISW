"use strict";
import mongoose from "mongoose";
const { Schema } = mongoose;

const concursoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
      enum: ["Abierto", "Cerrado", "En revisión", "Finalizado"],
      message:
        "El estado del concurso debe ser Abierto, Cerrado, En revisión o Finalizado",
    },
    postulaciones: [
      {
        type: Schema.Types.ObjectId,
        ref: "Postulacion",
      },
    ],
    fechaAperturaConcurso: {
      type: Date,
      required: true,
      validate: [
        {
          validator: async function (fechaAperturaConcurso) {
            // compara la fecha de apertura del concurso con la fecha actual
            return fechaAperturaConcurso >= Date.now();
          },
          message:
            "la fecha de apertura del concurso no puede ser anterior a la fecha actual",
        },
      ],
    },
    fechaCierreConcurso: {
      type: Date,
      required: true,
      validate: [
        {
          validator: async function (fechaCierreConcurso) {
            // Compara la fecha de cierre del concurso con la fecha de apertura del concurso
            return fechaCierreConcurso > this.fechaAperturaConcurso;
          },
          message:
            "La fecha de cierre del concurso debe ser posterior a la fecha de apertura del concurso.",
        },
      ],
    },
    fechaAnuncioGanadores: {
      type: Date,
      required: true,
      validate: [
        {
          validator: function (fechaAnuncioGanadores) {
            // Compara la fecha de cierre del concurso con la fecha de anuncio de los ganadores
            return fechaAnuncioGanadores > this.fechaCierreConcurso;
          },
          message:
            "La fecha de anuncio ganadores debe ser posterior a la fecha de cierre de concursos.",
        },
      ],
    },
  },
  {
    versionKey: false,
  }
);

export const Concurso = mongoose.model("Concurso", concursoSchema);
export default Concurso;
