import axios from './root.service';

export const getCategorias = async () => {
    try {
      const response = await axios.get('/categorias');
      if (response.status === 200) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error al obtener categorias:', error.message);
      throw error;
    }
  };