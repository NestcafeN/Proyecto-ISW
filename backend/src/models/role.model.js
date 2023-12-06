"use strict";

import mongoose from "mongoose";
const { Schema } = mongoose;
import ROLES from "../constants/roles.constants.js";

// Crea el esquema de la coleccion 'roles'
const roleSchema = new Schema(
  {
    name: {
      type: String,
      enum: ROLES,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

// Crea el modelo de datos 'Role' a partir del esquema 'roleSchema'
export const Role = mongoose.model("Role", roleSchema);

const crearRolEvaluador = async () => {
  try {
    const evaluadorRoleExistente = await Role.findOne({ name: 'evaluador' });

    if (!evaluadorRoleExistente) {
      const evaluadorRole = new Role({ name: 'evaluador' });
      await evaluadorRole.save();
    }
  } catch (error) {
    console.error('Error al crear el rol "Evaluador"', error);
  }
};

// Crear el rol "Evaluador" al definir el modelo
crearRolEvaluador();

export default Role;
