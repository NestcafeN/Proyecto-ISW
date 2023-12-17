import { Container, FormControl, FormLabel, Input, Select, Button } from '@chakra-ui/react'
import axios from '../services/root.service.js';
import { useEffect, useState } from 'react';


function ConcursosCreate() {
  
  
  const [fondo, setFondos] = useState([]);
    
  useEffect(() => {
    axios.get('fondos') // funciona 
      .then(response => {
        setFondos(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los Fondos:', error);
      });
  }, []);

  const [formConcursoData, setFormConcursoData] = useState({
    nombre: '',
    estado: '',
    fondo: '', 
    fechaAperturaConcurso: '',
    fechaCierreConcurso: '',
    fechaAnuncioGanadores: '',
  });

  const handleCreateConcurso = async () => {

  

    try { // no funciona
      // Realiza la solicitud POST para crear el concurso
      const response = await axios.post('concursos', formConcursoData);
      console.log('Concurso creado:', response.data);
      // Puedes redirigir al usuario a otra página o realizar alguna acción adicional
    } catch (error) {
      // Manejar errores en la solicitud
      console.error('Error al crear concurso:', error);
    }
  };
  const formatDate = (inputDate) => { // no funciona
    const [day, month, year] = inputDate.split('-');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Si el campo es una fecha, formatea la fecha antes de actualizar el estado
    if (name.includes('fecha')) {
      const formattedDate = formatDate(value);
      setFormConcursoData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      // Si no es un campo de fecha, actualiza el estado directamente
      setFormConcursoData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  return (
    <>
    <Container>
    <FormControl isRequired>
      <FormLabel>Nombre</FormLabel>
      <Input
          name= 'nombre' 
          placeholder='Ingrese el Nombre' 
          value={formConcursoData.nombre}
          onChange={handleInputChange}/>
    </FormControl>

    <FormControl isRequired>
  <FormLabel>Estado</FormLabel>
  <Select
    placeholder='Seleccione un Estado'
    onChange={handleInputChange}
  >
    <option value='Abierto'>Abierto</option>
    <option value='Cerrado'>Cerrado</option>
    <option value='En revisión'>En Revisión</option>
    <option value='Finalizado'>Finalizado</option>
  </Select>
</FormControl>

    <FormControl>
        <FormLabel>Fondos</FormLabel>
          <Select
            placeholder="Seleccione un Fondo"
            onChange={handleInputChange}>
            
              
          {fondo.map((fondos) => (
            
        <option key={fondos._id} value={fondos._id}>
        {fondos.nombre}
        </option>
  ))}
</Select>
    </FormControl>

    <FormControl isRequired>
      <FormLabel>Fecha de Apertura del Concurso</FormLabel>
        <Input type='date'
        value={formConcursoData.fechaAperturaConcurso}
        onChange={handleInputChange}/>
    </FormControl>

    <FormControl isRequired>
      <FormLabel>Fecha de Cierre del Concurso</FormLabel>
        <Input type='date'
        value={formConcursoData.fechaCierreConcurso}
        onChange={handleInputChange}/>
    </FormControl>

    <FormControl isRequired>
      <FormLabel>Fecha de Anuncio Ganadores del Concurso</FormLabel>
        <Input type='date'
        value={formConcursoData.fechaAnuncioGanadores}
        onChange={handleInputChange}/>
    </FormControl>

  <Button colorScheme='teal' variant='solid' onClick={handleCreateConcurso}> Crear </Button>
  </Container>
  </>
    )
}
export default ConcursosCreate;