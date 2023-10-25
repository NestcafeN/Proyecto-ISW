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
    tipo: {
      type: String,
      required: true,
    },
    monto: {
      type: Number,
      required: true,
    },
    fechaApertura: {
      type: Date,
      required: true,
    },
    fechaCierre: {
      type: Date,
      required: true,
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
