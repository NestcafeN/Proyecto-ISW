"use strict";
// Autorizacion - Comprobar el rol del usuario
import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";
import { respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Comprueba si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function isAdmin(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador para realizar esta acción"
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

async function isEvaluador(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "evaluador") {
        next();
        return;
      }
    }
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de evaluador para realizar esta acción"
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isEvaluador");
  }
}

async function commonAccessMiddleware(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });

    // Verifica si el usuario tiene el rol de administrador o evaluador
    const isAdminOrEvaluador = roles.some(role => ["admin", "evaluador"].includes(role.name));

    if (isAdminOrEvaluador) {
      next();
    } else {
      return respondError(
        req,
        res,
        401,
        "Se requiere un rol de administrador o evaluador para realizar esta acción"
      );
    }
  } catch (error) {
    handleError(error, "authorization.middleware -> commonAccessMiddleware");
  }
}

export { isAdmin, isEvaluador, commonAccessMiddleware };