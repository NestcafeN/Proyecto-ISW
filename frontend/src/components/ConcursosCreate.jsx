import { Container, FormControl, FormLabel, Input, Select, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import axios from '../services/root.service'
import { createConcurso } from '../services/concurso.service';


function ConcursosCreate() {
  
  const [newConcurso, setNewConcurso] = useState({
    nombre: '',
    estado: '',
    fondo: [{ _id: '', nombre: '' }], 
    fechaAperturaConcurso: '',
    fechaCierreConcurso: '',
    fechaAnuncioGanadores: '',
  });
  
  const [fondos, setFondos] = useState([]);
  
  useEffect(() => { //funciona 
    axios.get('fondos')
      .then(response => {
        setFondos(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los fondos:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewConcurso((prev) => ({ ...prev, [name]: value }));
  };
  

  const [selectedFondo, setSelectedFondo] = useState('');


  const handleCreateConcurso = async () => {
    try {
      const { id, _id, fondo, ...concursoWithoutId } = newConcurso;
  
      console.log('Datos a enviar para crear el Concurso:', {
        ...concursoWithoutId,
        fondo: [selectedFondo],
      });
  
      await createConcurso({ ...concursoWithoutId, fondo: [selectedFondo] });
      console.log('Nuevo Concurso creado:', newConcurso);
    } catch (error) {
      console.error('Error al crear el concurso:', error.message);
    }
  };


  return (
    
    <Container>
    <FormControl isRequired>
      <FormLabel>Nombre</FormLabel>
      <Input
          name= 'nombre' 
          placeholder='Ingrese el Nombre' 
          value={newConcurso.nombre}
          onChange={handleChange}/>
    </FormControl>

    <FormControl isRequired>
  <FormLabel>Estado</FormLabel>
  <Select
    name='estado'
    placeholder='Seleccione un Estado'
    onChange={handleChange}
    value={newConcurso.estado}>

    <option value='Abierto'>Abierto</option>
    <option value='Cerrado'>Cerrado</option>
    <option value='En revisión'>En Revisión</option>
    <option value='Finalizado'>Finalizado</option>
  </Select>
</FormControl>

    <FormControl isRequired>
        <FormLabel>Fondos</FormLabel>
          
<Select
  placeholder="Seleccione un Fondo"
  value={selectedFondo}
  onChange={(e) => setSelectedFondo(e.target.value)}
>

{fondos.map((fondo) => (
      <option key={fondo._id} value={fondo._id}>
        {fondo.nombre}
      </option>
    ))}
</Select>
    </FormControl>

    <FormControl isRequired>
      <FormLabel>Fecha de Apertura del Concurso</FormLabel>
        <Input type='date'
        value={newConcurso.fechaAperturaConcurso}
        onChange={(e) => handleChange({ target: { name: 'fechaAperturaConcurso', value: e.target.value } })}/>
    </FormControl>

    <FormControl isRequired>
      <FormLabel>Fecha de Cierre del Concurso</FormLabel>
        <Input type='date'
        value={newConcurso.fechaCierreConcurso}
        onChange={(e) => handleChange({ target: { name: 'fechaCierreConcurso', value: e.target.value } })}/>
    </FormControl>

    <FormControl isRequired>
      <FormLabel>Fecha de Anuncio Ganadores del Concurso</FormLabel>
        <Input type='date'
        value={newConcurso.fechaAnuncioGanadores}
        onChange={(e) => handleChange({ target: { name: 'fechaAnuncioGanadores', value: e.target.value } })}/>
    </FormControl>

    <Button colorScheme="blue" mr={3} onClick={handleCreateConcurso}>
                        Crear Concurso
                    </Button>
  </Container>
  
    )
}
export default ConcursosCreate;