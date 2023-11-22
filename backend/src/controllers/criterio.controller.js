import { Criterio } from '../models/criterio.model.js';
import { handleError } from '../utils/errorHandler.js';
import { respondSuccess, respondError } from '../utils/resHandler.js';
import { criterioBodySchema, criterioIdSchema } from '../schemas/criterio.schema.js';
import { criterioService } from '../services/criterio.service.js';

export async function getCriterios(req, res) {
    try {
        const [criterios, error] = await criterioService.getCriterios();

        if (error) {
            return respondError(req, res, 500, 'Error al obtener los Criterios', error);
        }

        respondSuccess(req, res, 200, criterios);
    } catch (error) {
        handleError(error, 'criterio.controller -> getCriterios');
        respondError(req, res, 500, 'Error al obtener los Criterios');
    }
}

export async function getCriterioById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = criterioIdSchema.validate(params);

        if (paramsError) {
            return respondError(req, res, 400, paramsError.message);
        }

        const [criterio, error] = await criterioService.getCriterioById(params.id);

        if (error) {
            return respondError(req, res, 500, 'Error al obtener el Criterio', error);
        }

        if (!criterio) {
            return respondError(req, res, 404, 'Criterio no encontrado');
        }

        respondSuccess(req, res, 200, criterio);
    } catch (error) {
        handleError(error, 'criterio.controller -> getCriterioById');
        respondError(req, res, 500, 'Error al obtener el Criterio');
    }
}

export async function createCriterio(req, res) {
    try {
        const { error, value } = criterioBodySchema.validate(req.body, { abortEarly: false });

        if (error) {
            return respondError(req, res, 400, 'Error al crear Criterio', error.details);
        }

        const [newCriterio, createError] = await criterioService.createCriterio(value);

        if (createError) {
            return respondError(req, res, 400, 'Error al crear Criterio', createError);
        }

        respondSuccess(req, res, 201, newCriterio);
    } catch (error) {
        handleError(error, 'criterio.controller -> createCriterio');
        respondError(req, res, 400, 'Error al crear Criterio');
    }
}

export async function updateCriterio(req, res) {
    try {
        const { body, params } = req;
        const { error: bodyError } = criterioBodySchema.validate(body, { abortEarly: false });
        const { error: paramsError } = criterioIdSchema.validate(params);

        if (bodyError || paramsError) {
            const validationErrors = [
                ...(bodyError?.details || []),
                ...(paramsError?.details || []),
            ].map(error => ({
                field: error.path.join('.'),
                message: error.message,
            }));
            return respondError(req, res, 400, validationErrors);
        }

        const [updatedCriterio, updateError] = await criterioService.updateCriterio(params.id, body);

        if (updateError) {
            return respondError(req, res, 400, 'Error al actualizar Criterio', updateError);
        }

        if (!updatedCriterio) {
            return respondError(req, res, 404, 'Criterio no encontrado');
        }

        respondSuccess(req, res, 200, updatedCriterio);
    } catch (error) {
        handleError(error, 'criterio.controller -> updateCriterio');
        respondError(req, res, 500, 'Error al actualizar Criterio');
    }
}

export async function deleteCriterio(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = criterioIdSchema.validate(params);

        if (paramsError) {
            return respondError(req, res, 400, paramsError.message);
        }

        const deleteResult = await criterioService.deleteCriterio(params.id);

        if (!deleteResult) {
            return respondError(req, res, 404, 'Criterio no encontrado');
        }

        respondSuccess(req, res, 200, { message: 'Criterio eliminado correctamente' });
    } catch (error) {
        handleError(error, 'criterio.controller -> deleteCriterio');
        respondError(req, res, 500, 'Error al eliminar Criterio');
    }
}

export const criterioController = {
    getCriterios,
    getCriterioById,
    createCriterio,
    updateCriterio,
    deleteCriterio,
};