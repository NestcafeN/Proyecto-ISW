import mongoose from "mongoose";
const { Schema } = mongoose;

const criterioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        minlength: [10, 'El nombre debe tener al menos 10 caracteres'],
        maxlength: [100, 'El nombre no puede tener más de 100 caracteres'],
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
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
        maxlength: [500, 'La descripción no puede tener más de 500 caracteres'],
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

    puntaje: {
        type: Number,
        required: true,
        min: [0, 'El puntaje debe ser al menos 0'],
        max: [100, 'El puntaje no puede ser mayor que 100'],
    },
});

export const Criterio = mongoose.model("Criterio", criterioSchema);
export default Criterio;
