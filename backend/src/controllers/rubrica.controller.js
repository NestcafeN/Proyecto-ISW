import { rubricaService } from '../services/rubrica.service.js';
import { criterioService } from '../services/criterio.service.js';
import { rubricaBodySchema, rubricaIdSchema } from '../schemas/rubrica.schema.js';
import { handleError } from '../utils/errorHandler.js';
import { respondSuccess, respondError } from '../utils/resHandler.js';

export async function getRubricas(req, res) {
  try {
    const [rubricas, error] = await rubricaService.getRubricas();
    const formattedRubricas = rubricas.map(formatRubrica);
    if (error) {
      return respondError(req, res, 500, 'Error al obtener las Rúbricas', error);
    }
    respondSuccess(req, res, 200, { rubricas: formattedRubricas });
  } catch (error) {
    handleError(error, 'rubrica.controller -> getRubricas');
    respondError(req, res, 500, 'Error al obtener las Rúbricas');
  }
}

export async function getRubricaById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = rubricaIdSchema.validate(params);

    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const [rubrica, error] = await rubricaService.getRubricaById(params.id);
    if (error) {
      return respondError(req, res, 500, 'Error al obtener la Rúbrica', error);
    }

    if (!rubrica) {
      return respondError(req, res, 404, 'Rúbrica no encontrada');
    }

    const formattedRubrica = formatRubrica(rubrica);

    respondSuccess(req, res, 200, formattedRubrica);
  } catch (error) {
    handleError(error, 'rubrica.controller -> getRubricaById');
    respondError(req, res, 500, 'Error al obtener la Rúbrica');
  }
}

export async function createRubrica(req, res) {
  try {
    const { error, value } = rubricaBodySchema.validate(req.body, { abortEarly: false });
    console.log('Cuerpo de la solicitud:', req.body);
    if (error) {
      console.log('bodyError:', error); // Agrega este console.log
      return respondError(req, res, 400, 'Error al crear Rúbrica', error.details);
    }

    if (!value.criterios || value.criterios.length === 0) {
      return respondError(req, res, 400, 'La rúbrica debe tener al menos un criterio');
    }

    const [rubrica, errorCreate] = await rubricaService.createRubrica(value);

    if (errorCreate) {
      console.log('errorCreate:', errorCreate); // Agrega este console.log
      return respondError(req, res, 400, 'Error al crear Rúbrica', errorCreate);
    }
    respondSuccess(req, res, 201, rubrica);
  } catch (error) {
    if (error.code && error.code === 11000) {
      return respondError(req, res, 400, 'Ya existe una rúbrica con este nombre', error);
    } else if (error.message.includes('No pueden existir criterios con el mismo nombre en una rúbrica')) {
      return respondError(req, res, 400, 'No pueden existir criterios con el mismo nombre en una rúbrica', error);
    }
    handleError(error, 'rubrica.controller -> createRubrica');
    respondError(req, res, 400, 'Error al crear Rúbrica');
  }
}

export async function updateRubrica(req, res) {
  try {
    const { body, params } = req;
    const { error: bodyError } = rubricaBodySchema.validate(body, { abortEarly: false });
    const { error: paramsError, value: validatedParams } = rubricaIdSchema.validate(params);

    if (bodyError || paramsError) {
      const validationError = bodyError || paramsError;
      return respondError(req, res, 400, validationError.message);
    }

    if (!validatedParams || !validatedParams.id) {
      return respondError(req, res, 400, 'El ID proporcionado no es un ObjectId válido.');
    }

    const [rubrica, errorUpdate] = await rubricaService.updateRubrica(validatedParams.id, body);
    if (errorUpdate) {
      return respondError(req, res, 400, 'Error al actualizar Rúbrica', errorUpdate);
    }

    respondSuccess(req, res, 200, rubrica);
  } catch (error) {
    handleError(error, 'rubrica.controller -> updateRubrica');
    respondError(req, res, 400, 'Error al actualizar Rúbrica');
  }
}

export async function deleteRubrica(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = rubricaIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const [deletedRubrica, errorDelete] = await rubricaService.deleteRubrica(params.id);

    if (errorDelete) {
      return respondError(req, res, 400, 'Error al eliminar Rúbrica', errorDelete);
    }

    if (!deletedRubrica) {
      return respondError(req, res, 404, 'Rúbrica no encontrada');
    }

    respondSuccess(req, res, 200, { message: 'Rúbrica eliminada correctamente' });
  } catch (error) {
    handleError(error, 'rubrica.controller -> deleteRubrica');
    respondError(req, res, 400, 'Error al eliminar Rúbrica');
  }
}

async function addCriterioById(req, res) {
  try {
    const { body, params } = req;
    const { error: paramsError } = rubricaIdSchema.validate(params);
    if (paramsError) {
      return respondError(req, res, 400, paramsError.message);
    }

    const { id } = params;
    const { criterios } = body;
    const updatedRubrica = await rubricaService.addCriterioById(id, criterios);
    if (!updatedRubrica) {
      return respondError(req, res, 404, "Fondo no encontrado");
    }
    respondSuccess(req, res, 200, updatedRubrica);
  } catch (error) {
    handleError(error, "rubrica.controller -> updateIdCriterio");
    respondError(req, res, 500, "No se pudo actualizar el id del criterio");
  }
}

async function deleteCriterioById(req, res) {
  try {
    const { RubricaID } = req.params;
    const { CriterioID } = req.params;

    const updatedRubrica = await rubricaService.deleteCriterioById(
      RubricaID,
      CriterioID
    );

    if (!updatedRubrica) {
      return respondError(
        req,
        res,
        404,
        "No se pudo eliminar el criterio de la Rubrica"
      );
    }
    respondSuccess(req, res, 200, updatedRubrica);
  } catch (error) {
    handleError(error, "rubrica.controller -> deleteCriterioById");
    respondError(req, res, 500, "No se pudo eliminar el criterio de la Rubrica");
  }
}

function formatRubrica(rubrica) {
  return {
    _id: rubrica._id,
    nombre: rubrica.nombre,
    tipoFondo: rubrica.tipoFondo,
    criterios: rubrica.criterios,
    puntajeMinimoAprobacion: rubrica.puntajeMinimoAprobacion,
    puntajeMaximoAprobacion: rubrica.puntajeMaximoAprobacion,
    puntajeTotal: rubrica.puntajeTotal,
    estado: rubrica.estado,
    fechaCreacion: formatDate(rubrica.fechaCreacion),
    fechaModificacion: formatDate(rubrica.fechaModificacion),
  };
}

// Función para formatear una fecha a 'dd-mm-yyyy'
function formatDate(date) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

export const rubricaController = {
  getRubricas,
  getRubricaById,
  createRubrica,
  updateRubrica,
  deleteRubrica,
  addCriterioById,
  deleteCriterioById,
  formatRubrica,
  formatDate,
};