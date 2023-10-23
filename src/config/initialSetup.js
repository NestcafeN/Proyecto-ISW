"use strict";

import Role, { estimatedDocumentCount, findOne } from "../models/role.model.js";
import User, { estimatedDocumentCount as _estimatedDocumentCount, encryptPassword } from "../models/user.model.js";

/**
 * Crea los roles por defecto en la base de datos.
 * @async
 * @function createRoles
 * @returns {Promise<void>}
 */
async function createRoles() {
  try {
    // Busca todos los roles en la base de datos
    const count = await estimatedDocumentCount();
    // Si no hay roles en la base de datos los crea
    if (count > 0) return;

    await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

/**
 * Crea los usuarios por defecto en la base de datos.
 * @async
 * @function createUsers
 * @returns {Promise<void>}
 */
async function createUsers() {
  try {
    const count = await _estimatedDocumentCount();
    if (count > 0) return;

    const admin = await findOne({ name: "admin" });
    const user = await findOne({ name: "user" });

    await Promise.all([
      new User({
        username: "user",
        email: "user@email.com",
        password: await encryptPassword("user123"),
        roles: user._id,
      }).save(),
      new User({
        username: "admin",
        email: "admin@email.com",
        password: await encryptPassword("admin123"),
        roles: admin._id,
      }).save(),
    ]);
    console.log("* => Users creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

export default {
  createRoles,
  createUsers,
};
