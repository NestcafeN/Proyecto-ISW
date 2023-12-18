import axios from './root.service';

export const createCriterios = async (newCriterio) => {
  try {
    const response = await axios.post('/criterio', newCriterio);

    if (response.status === 201) {
      console.log('Criterio creado exitosamente:', response.data);
      return response.data;
    } else {
      console.error('Error al crear el criterio:', response.statusText);
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error.message);

    // Muestra el contenido del cuerpo de la respuesta en caso de un error 400
    if (error.response && error.response.data) {
      console.error('Detalles del error:', error.response.data);
  }

    throw error; // Reenvía el error para que pueda ser manejado por el código que llama a esta función
  }
};

export const getCriterios = async () => {
  try {
    const response = await axios.get('/criterio');
    if (response.status === 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Error al obtener criterios:', error.message);
    throw error;
  }
};

export const updateCriterio = async (criterioId, updatedCriterio) => {
  try {
    console.log('criterioId:', criterioId);
    const response = await axios.put(`/criterio/${String(criterioId)}`, updatedCriterio);

    if (response.status === 200) {
      console.log('Criterio actualizado exitosamente');
    } else {
      console.error('Error al actualizar el criterio:', response.statusText);
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error.message);

    if (error.response && error.response.data) {
      console.error('Detalles del error:', error.response.data);
    }
  }
};

export const deleteCriterio = async (criterioId) => {
  try {
    const response = await axios.delete(`/criterio/${criterioId}`);

    if (response.status === 200) {
      console.log('Criterio eliminado con éxito:', response.data);
      return response.data;
    } else if (response.status !== 204) {
      throw new Error(`Error al eliminar el criterio: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error al eliminar el criterio:', error.message);
    throw error;
  }
};

export const updatePuntajeCriterio = async (criterioId, puntaje) => {
  try {
    const response = await axios.put(`/criterio/${criterioId}/puntaje`, { puntaje });

    if (response.status === 200) {
      console.log('Puntaje del criterio actualizado exitosamente');
    } else {
      console.error('Error al actualizar el puntaje del criterio:', response.statusText);
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error.message);

    if (error.response && error.response.data) {
      console.error('Detalles del error:', error.response.data);
    }
  }
};
