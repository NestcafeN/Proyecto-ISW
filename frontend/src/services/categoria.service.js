import axios from './root.service'

export const getCategorias = async () => {
      try {
        const res = await axios.get('categorias');
        if (res.status === 200) {
          return res.data.data;
        }
        return [];
      } catch (error) {
        console.error('Error al obtener categorias:', error.message);
        throw error;
      }
    };

export const createCategoria = async (newCategoria) => {
      try {
        const res = await axios.post('categorias', newCategoria);
    
        if (res.status === 201) {
          console.log('Categoria creada exitosamente:', res.data);
          return res.data;
        } else {
          console.error('Error al crear la Categoria:', res.statusText);
        }
      } catch (error) {
        console.error('Error al procesar la solicitud:', error.message);
    
        // Muestra el contenido del cuerpo de la respuesta en caso de un error 400
        if (error.res && error.res.data) {
          console.error('Detalles del error:', error.res.data);
        }
        
        throw error; // Reenvía el error para que pueda ser manejado por el código que llama a esta función
      }
    };