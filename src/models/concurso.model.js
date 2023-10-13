import mongoose from "mongoose";
const { Schema } = mongoose;

const concursoSchema = new Schema({
      nombre: {
            type: String,
            required: true,
      },
      descripcion: {
            type: String,
            required: true,
      },
      tipo: {
            type: String,
            required: true,
      },
      estado: {
            type: String,
            required: true,
      },
      postulaciones: {
            type: Number,
            required: true,
      },
      fechaAperturaConcurso: {
            type: Date,
            required: true,
      },
      fechaCierreConcurso: {
            type: Date,
            required: true,
      },
      fechaAnuncioGanador: {
            type: Date,
            required: true,
      },
      
});


export const Concurso = mongoose.model("Concurso", concursoSchema);
export default Concurso;
