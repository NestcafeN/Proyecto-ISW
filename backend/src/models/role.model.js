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
export default Role;
