import mongoose from "mongoose";
 

const { Schema } = mongoose;

const postulacionSchema = new Schema({
  nombreCompleto: {
    type: String,
    maxlength: 30,
    required: true,
    validate: {
      validator: function (nombreCompleto) {
        // Mínimo un espacio en blanco
        return /\s/.test(nombreCompleto) && !/^\s+$/.test(nombreCompleto);
      },
      message: "Debe contener al menos un espacio en blanco o no contener solo espacios",
    },
  },
  rut: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (rut) {
        return /^[0-9]{7,8}[Kk]?$/.test(rut);
      },
      message: "RUT inválido, por favor ingrese un RUT válido.",
    },
  },
  
  concurso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Concurso', // Nombre del modelo referenciado
    required: true
  },
  correo: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
    trim: true,
  },
  direccion: {
    type: String,
    maxlength: 30,
    required: true,
    validate: {
      validator: function (direccion) {
        // Mínimo un espacio en blanco
        return /\s/.test(direccion) && !/^\s+$/.test(direccion);
      },
      message: "Debe contener al menos un espacio en blanco o no contener solo espacios",
    },
  },
  proyecto: {
    maxlength: 200,
    type: String,
    required: true,
    validate: {
      validator: function (proyecto) {
        // Mínimo un espacio en blanco
        return /\s/.test(proyecto) && !/^\s+$/.test(proyecto);
      },
      message: "Debe contener al menos un espacio en blanco o no contener tan solo espacios",
    },
  },
  estado: {
    type: String,
    required: true,
    default: "EN REVISION",
    enum: ["RECHAZADO", "ACEPTADO", "EN REVISION"],
    message: "El estado debe ser en ACEPTADO, RECHAZADO u EN REVISION"
  },
  fechaPostulacion: {
    type: Date,
    required: true,
    default: Date.now(),
    
  },
},
{
  versionKey: false,
});

export const Postulacion = mongoose.model("Postulacion", postulacionSchema);
export default Postulacion;