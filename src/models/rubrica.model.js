import mongoose from "mongoose";
const { Schema } = mongoose;

const criterioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    puntaje: {
        type: Number,
    required: true,
    },
});

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
    criterios: [criterioSchema],
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