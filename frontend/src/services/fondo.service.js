import axios from './root.service'


export const getFondos = async () => {
  try {
    const response = await axios.get('fondos');

    console.log("Response from getFondo:", response);

    if (response.status === 200 && response.data.state === "Success") {
      const fondosArray = response.data.data.fondo;

      console.log("Data from getFondo:", fondosArray);

      if (Array.isArray(fondosArray)) {
        return fondosArray;
      } else {
        console.error("La propiedad fondos no es un array:", fondosArray);
        return [];
      }
    }

    console.error("Error al obtener fondos. Estado:", response.data.state); // Agrega este log
    return [];
  } catch (error) {
    console.error("Error al obtener fondos:", error);
    return [];
  }
};


export const createFondo = async (newFondo) => {
      try {
        const res = await axios.post('fondos', newFondo);
    
        if (res.status === 201) {
          console.log('Fondo creado exitosamente:', res.data);
          return res.data;
        } else {
          console.error('Error al crear el fondo: ', res.statusText);
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

    export const deleteFondo = async (fondoId) => {
      try {
        const response = await axios.delete(`fondo/${fondoId}`);
    
        if (response.status === 200) {
          console.log('Fondo eliminado con éxito:', response.data);
          return response.data;
        } else if (response.status !== 204) {
          throw new Error(`Error al eliminar el fondo: ${response.status}`);
        }
    
        return response.data;
      } catch (error) {
        console.error('Error al eliminar el fondo:', error.message);
        throw error;
      }
    };