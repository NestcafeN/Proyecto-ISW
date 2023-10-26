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

export const Criterio = mongoose.model("Criterio", criterioSchema);
export default Criterio;
