"use strict";

import mongoose from "mongoose";
const { Schema } = mongoose;
import bcryptjs from "bcryptjs";
const { genSalt, hash, compare } = bcryptjs;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    versionKey: false,
  }
);

/** Encripta la contraseña del usuario */
userSchema.statics.encryptPassword = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

/** Compara la contraseña del usuario */
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  console.log('Contraseña proporcionada:', password, 'Longitud:', password.length);
  console.log('Contraseña almacenada:', receivedPassword, 'Longitud:', receivedPassword.length);
  
  const result = await compare(password, receivedPassword);
  
  console.log('Resultado de la comparación:', result);
  return result;
};

export const User = mongoose.model("User", userSchema);
export default User;
