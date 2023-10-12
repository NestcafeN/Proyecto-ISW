import mongoose from "mongoose";
const { Schema } = mongoose;

const postulacionSchema = new Schema({
      nombreCompleto: {
            type: String,
            required: true,
            },
      rut: {
            type: String,
            required: true,
            unique: true,
            validate: {
                  validator: function (rut) {
                      
                      return /^[0-9]{7,8}[Kk]?$/.test(rut);
                  },
                  message: "RUT inválido, por favor ingrese un RUT válido."
              }
            },
      correo: {
            type: String,
            require:true,
            match: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
            trim: true,
            },
       direccion: {
            type: String,
            required: true,
            },
      proyecto: {
            type: String,
            required: true,
            },
      concurso: {
            type: String,
            required: true,
            },
      fechaPostulacion: {
            type: Date,
            required: true,
            },
});

export const Postulacion = mongoose.model("Postulacion", postulacionSchema)
      