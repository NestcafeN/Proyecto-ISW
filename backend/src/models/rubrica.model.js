import mongoose from "mongoose";

const { Schema } = mongoose;

const rubricaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
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
    categorias: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
    },
    criterios: [
        {
            type: Schema.Types.ObjectId,
            ref: "Criterio",
        },
    ],
    postulacion: {
            type: Schema.Types.ObjectId,
            ref: "Postulacion",
    },
    puntajeMinimoAprobacion: {
        type: Number,
        required: true,
        min: [0, 'El puntaje mínimo de aprobación debe ser al menos 0'],
        max: [100, 'El puntaje mínimo de aprobación no puede ser mayor que 100'],
    },
    puntajeMaximoAprobacion: {
        type: Number,
        required: true,
        min: [0, 'El puntaje máximo de aprobación debe ser al menos 0'],
        max: [100, 'El puntaje máximo de aprobación no puede ser mayor que 100'],
        validate: [
            {
                validator: function (value) {
                    return value >= this.puntajeMinimoAprobacion;
                },
                message: "El puntaje máximo de aprobación no puede ser menor que el puntaje mínimo de aprobación",
            },
            {
                validator: function (value) {
                    return value >= 0; // Puntaje no puede ser negativo
                },
                message: "El puntaje máximo de aprobación no puede ser negativo",
            },
        ],
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