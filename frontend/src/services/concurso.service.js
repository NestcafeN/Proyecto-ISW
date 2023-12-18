import axios from './root.service'


export const createConcurso = async (newConcurso) => {
      try {
        const res = await axios.post('concursos', newConcurso);
    
        if (res.status === 201) {
          console.log('Concurso creado exitosamente:', res.data);
          return res.data;
        } else {
          console.error('Error al crear el concurso:', res.statusText);
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