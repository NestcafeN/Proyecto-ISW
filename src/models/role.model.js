"use strict"

import { Schema, model } from "mongoose";
import ROLES from "../constants/roles.constants";

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
  },
);

// Crea el modelo de datos 'Role' a partir del esquema 'roleSchema'
const Role = model("Role", roleSchema);

export default Role;
