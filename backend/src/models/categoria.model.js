"use strict";
import mongoose from "mongoose";
const { Schema } = mongoose;

const categoriaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 100,
    validate: {
      validator: function (value) {
        const caracteresPermitidos = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s,_]+$/;
        const caracteresInvalidos = /[#$%!|¬?¡¿()=><.;:~*+/{}[\]^`]+/;
        if (
          !caracteresPermitidos.test(value) ||
          caracteresInvalidos.test(value)
        ) {
          return false;
        }
        return true;
      },
      message: "Formato de nombre de categoría no válido",
    },
  },
},{
  versionKey: false,
}
);

export const Categoria = mongoose.model("Categoria", categoriaSchema);
export default Categoria;
