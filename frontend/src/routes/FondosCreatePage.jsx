import React, {useState} from 'react'
import FondosCreate from '../components/FondosCreate';
import { createFondo } from '../services/fondo.service';



const FondosCreatePage = () => {

      const [formFondoData, setFormFondoData] = useState({ // no esta funcionando esto
            nombre: '',
            descripcion: '',
            categoria: '',
            montoMax: '',
            fechaApertura: '',
            fechaCierre: '',
      });

      const handleCreateFondo = async () => {
            try {
                  const respuestaBackend = await createFondo(formFondoData);
                  console.log('Fondo creado:', respuestaBackend);
            } catch (error) {
                  console.error('Error al crear Fondo', error);
            }
      }

      

      return (
      <>
      
      <FondosCreate formFondoData={formFondoData}
      setFormFondoData={setFormFondoData}
      handleCreateFondo={handleCreateFondo}/>
      
      </>
);
}

export default FondosCreatePage;