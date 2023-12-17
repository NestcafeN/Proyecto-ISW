import axios from './root.service';

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