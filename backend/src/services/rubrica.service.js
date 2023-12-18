import { handleError } from "../utils/errorHandler.js";
import Rubrica from "../models/rubrica.model.js";
import Criterio from "../models/criterio.model.js";

async function getRubricas() {
  try {
    const rubricas = await Rubrica.find()
      .populate("categorias")
      .populate("criterios")
      .populate("postulacion")
      .exec();

    if (!rubricas || rubricas.length === 0) {
      console.log("No hay rubricas registradas");
      return [[], "No hay rubricas registradas"];
    }

    return [rubricas, null];
  } catch (error) {
    handleError(error, "rubrica.service -> getRubricas");
  }
}

async function getRubricaById(id) {
  try {
    const rubrica = await Rubrica.findById(id)
    .populate("categorias")
    .populate("criterios")
    .populate("postulacion")
    .exec();

    if (!rubrica) {
      console.log("Rubrica no encontrada");
      return [null, "Rubrica no encontrada"];
    }

    console.log("Rubrica encontrada:", rubrica.toJSON());
    return [rubrica.toJSON(), null];
  } catch (error) {
    handleError(error, "rubrica.service -> getRubricaById");
    console.log("Error al buscar la Rubrica:", error.message);
    return [null, error.message];
  }
}

async function createRubrica(rubrica) {
  try {
    const { nombre, categorias, postulacion, criterios, puntajeMinimoAprobacion, puntajeMaximoAprobacion } = rubrica;
    if (!nombre || !criterios || !puntajeMinimoAprobacion || !puntajeMaximoAprobacion || !categorias || !postulacion === undefined) {
      return [null, "Faltan datos obligatorios para crear la rubrica"];
    }

    const rubricaFound = await Rubrica.findOne({ nombre });

    if (rubricaFound) {
      return [null, "La rubrica ya existe"];
    }
    const newRubrica = new Rubrica({
      nombre,
      categorias,
      postulacion,
      criterios,
      puntajeMinimoAprobacion,
      puntajeMaximoAprobacion,
    });
    await newRubrica.save();
    return [newRubrica, null];
  }
  catch (error) {
    handleError(error, "rubrica.service -> createRubrica");
  }
}

async function updateRubrica(id, rubrica) {
  try {
    const rubricaFound = await Rubrica.findById(id);
    if (!rubricaFound) {
      return [null, "Rubrica no encontrada"];
    }
    const {
      nombre, categorias, postulacion, criterios, puntajeMinimoAprobacion, puntajeMaximoAprobacion
    } = rubrica;

    const rubricaUpdated = await Rubrica.findByIdAndUpdate(
      id,
      {
        nombre,
        categorias,
        postulacion,
        criterios,
        puntajeMinimoAprobacion,
        puntajeMaximoAprobacion,
      },
      {
        new: true,
      }
    );
    return [rubricaUpdated, null];
  }
  catch (error) {
    handleError(error, "rubrica.service -> updateRubrica");
  }
}

async function deleteRubrica(id) {
  try {
    const deletedRubrica = await Rubrica.findByIdAndDelete(id);

    if (!deletedRubrica) {
      return [null, 'Rúbrica no encontrada'];
    }

    return [deletedRubrica, null];
  } catch (error) {
    handleError(error, 'rubrica.service -> deleteRubrica');
    return [null, 'Error al eliminar Rúbrica'];
  }
}

async function addCriterioById(id, criterios) {
  try {
    const rubricaFound = await Rubrica.findById(id);
    if (!rubricaFound) {
      return [null, "Rubrica no encontrada"];
    }
    const updatedRubrica = await Rubrica.findByIdAndUpdate(
      id,
      { criterios },
      { new: true }
    );
    if (!updatedRubrica) {
      return [null, "Rubrica no encontrada"];
    }

    return [updatedRubrica, null];
  } catch (error) {
    handleError(error, "rubrica.service -> updateRubrica");
  }
}

async function deleteCriterioById(RubricaID, CriterioID) {
  try {
    const rubricaFound = await Rubrica.findById(RubricaID);
    if (!rubricaFound) {
      return [null, "Rubrica no encontrada"];
    }
    const criterioFound = await Criterio.findById(CriterioID);
    if (!criterioFound) {
      return [null, "Criterio no encontrado"];
    }
    const updatedRubrica = await Rubrica.findByIdAndUpdate(
      RubricaID,
      { $pull: { criterios: CriterioID } },
      { new: true }
    );

    const rubricaUpdated = await rubricaFound.save();

    return [rubricaUpdated, null];
  } catch (error) {
    handleError(error, "rubrica.service -> deleteCriterioById");
  }
}

export const rubricaService = {
  getRubricas,
  getRubricaById,
  createRubrica,
  updateRubrica,
  deleteRubrica,
  addCriterioById,
  deleteCriterioById,
};