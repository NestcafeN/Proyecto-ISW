import mongoose from "mongoose";

const { Schema } = mongoose;

const rubricaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
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
                    const caracteresPermitidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s&_-]+$/;
                    const caracteresInvalidos = /[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s&_-]/;

                    return caracteresPermitidos.test(value) && !caracteresInvalidos.test(value);
                },
                message: "Formato de nombre no válido",
            }
        ],
    },

    tipoFondo: {
        type: String,
        required: true,
        minlength: [3, 'El tipo de fondo debe tener al menos 3 caracteres'],
        maxlength: [30, 'El tipo de fondo no puede tener más de 30 caracteres'],
        validate: [
            {
                validator: function (value) {
                    const caracteresPermitidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s&_-]+$/;
                    const caracteresInvalidos = /[#$%!|¬?¡¿()=><.;,:~*+/{}[\]^`]+/;

                    return caracteresPermitidos.test(value) && !caracteresInvalidos.test(value);
                },
                message: "Formato de tipo de fondo no válido. Solo se permiten letras, números, espacios y algunos caracteres especiales.",
            },
            {
                validator: function (value) {
                    return /\s/.test(value) && !/^\s+$/.test(value);
                },
                message: "Debe contener al menos un espacio en blanco o no contener solo espacios",
            },
        ],
    },

    criterios: [
        {
          type: Schema.Types.ObjectId,
          ref: "Criterio",
        },
      ],

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
        validate: {
            validator: function (value) {
                return value >= this.puntajeMinimoAprobacion;
            },
            message: "El puntaje máximo de aprobación no puede ser menor que el puntaje mínimo de aprobación",
        },
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
