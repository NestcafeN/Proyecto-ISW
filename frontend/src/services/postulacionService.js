import api from './root.service.js'; 

const createPostulacion = async (postulacionData) => {
  try {
    const response = await api.post('/postulacion', postulacionData); 

    return response.data;
  } catch (error) {
    throw new Error(`Error al crear la postulación: ${error.message}`);
  }
};

const getAllPostulaciones = async () => {
  try {
    const response = await api.get('/postulacion'); 
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener todas las postulaciones: ${error.message}`);
  }
};
const deletePostulacion = async (postId) => {
  try {
    const response = await api.delete(`/postulacion/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error en la solicitud: ${error.message}`);
  }
};
const updateEstadoPostulacion = async (postId, estado) => {
  try {
    const response = await api.put(`/postulacion/${postId}/estado`, { estado });
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar el estado de la postulación: ${error.message}`);
  }
};

export { createPostulacion, getAllPostulaciones, deletePostulacion, updateEstadoPostulacion };