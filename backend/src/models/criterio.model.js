import mongoose from "mongoose";
const { Schema } = mongoose;

const criterioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        minlength: [10, 'El nombre debe tener al menos 10 caracteres'],
        maxlength: [100, 'El nombre no puede tener más de 100 caracteres'],
        validate: [
            {
                validator: function (value) {
                    return /\s/.test(value) && !/^\s+$/.test(value);
                },
                message: "Debe contener al menos un espacio en blanco o no contener solo espacios",
            },
            {
                validator: function (value) {
                    const caracteresPermitidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s&()$-]+$/;
                    const caracteresInvalidos = /[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s&()$-]/;

                    return caracteresPermitidos.test(value) && !caracteresInvalidos.test(value);
                },
                message: "Formato de nombre no válido",
            }
        ],
    },
    descripcion: {
        type: String,
        required: true,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
        maxlength: [500, 'La descripción no puede tener más de 500 caracteres'],
        validate: [
            {
                validator: function (value) {
                    return /\s/.test(value) && !/^\s+$/.test(value);
                },
                message: "Debe contener al menos un espacio en blanco o no contener solo espacios",
            },
            {
                validator: function (value) {
                    const caracteresPermitidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s&()$-]+$/;
                    const caracteresInvalidos = /[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s&()$-]/;

                    return caracteresPermitidos.test(value) && !caracteresInvalidos.test(value);
                },
                message: "Formato de descripción no válido",
            }
        ],
    },
    puntaje: {
        type: Number,
        required: true,
        min: [0, 'El puntaje debe ser al menos 0'],
        max: [100, 'El puntaje no puede ser mayor que 100'],
    },
});

export const Criterio = mongoose.model("Criterio", criterioSchema);
export default Criterio;
