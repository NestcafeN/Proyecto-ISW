import mongoose from "mongoose";
import { Criterio } from "./criterio.model.js";

const { Schema } = mongoose;

const rubricaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    tipoFondo: {
        type: String,
        required: true,
    },
    criterios: [Criterio.schema],
    puntajeMinimoAprobacion: {
        type: Number,
        required: true,
    },
    puntajeMaximoAprobacion: {
        type: Number,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    fechaModificacion: {
        type: Date,
        default: Date.now,
    },
});

export const Rubrica = mongoose.model("Rubrica", rubricaSchema);
export default Rubrica;
