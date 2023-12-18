import axios from './root.service';

export const createRubrica = async (newRubrica) => {
  try {
    const response = await axios.post('/rubrica', newRubrica);

    if (response.status === 201) {
      console.log('Rúbrica creada exitosamente:', response.data);
      return response.data;
    } else {
      console.error('Error al crear la rúbrica:', response.statusText);
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


export const getRubrica = async () => {
  try {
    const response = await axios.get('/rubrica');

    console.log("Response from getRubrica:", response);

    if (response.status === 200 && response.data.state === "Success") {
      const rubricasArray = response.data.data.rubricas;

      if (Array.isArray(rubricasArray)) {
        return rubricasArray;
      } else {
        console.error("La propiedad rubricas no es un array:", rubricasArray);
        return [];
      }
    }

    console.error("Error al obtener rubricas. Estado:", response.data.state); // Agrega este log
    return [];
  } catch (error) {
    console.error("Error al obtener rubricas:", error);
    return [];
  }
};

export const deleteRubrica = async (rubricaId) => {
  try {
    const response = await axios.delete(`/rubrica/${rubricaId}`);

    if (response.status === 200) {
      console.log('Rúbrica eliminada con éxito:', response.data);
      return response.data;
    } else if (response.status !== 204) {
      throw new Error(`Error al eliminar la rúbrica: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error al eliminar la rúbrica:', error.message);
    throw error;
  }
};

export const updateRubrica = async (rubricaId, updatedRubrica) => {
  try {
    console.log('rubricaId:', rubricaId);
    const response = await axios.put(`/rubrica/${String(rubricaId)}`, updatedRubrica);

    if (response.status === 200) {
      console.log('Rúbrica actualizada exitosamente');
    } else {
      console.error('Error al actualizar la rúbrica:', response.statusText);
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error.message);

    // Muestra el contenido del cuerpo de la respuesta en caso de un error 400
    if (error.response && error.response.data) {
      console.error('Detalles del error:', error.response.data);
    }
  }
};

