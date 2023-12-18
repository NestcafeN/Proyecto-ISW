import { Container, FormControl, FormLabel, Input, Select, InputGroup,InputLeftElement, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { createFondo } from '../services/fondo.service';
import { getCategorias } from '../services/categoria.service';



function FondosCreate() {

  const [newFondo, setNewFondo] = useState({
  nombre: '',
  descripcion: '',
  categoria: [{ _id: '', nombre: '' }],
  montoMax: '',
  fechaApertura: '',
  fechaCierre: '',
    
});

const [categorias, setCategorias] = useState([]);

useEffect(() => {
  const fetchCategorias = async () => {
      try {
          const listaCategorias = await getCategorias();
          setCategorias(listaCategorias);
      } catch (error) {
          console.error('Error al obtener criterios:', error.message);
      }
  };
  fetchCategorias();
}, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  setNewFondo((prev) => ({ ...prev, [name]: value }));
};

const [selectedCategoria, setSelectedCategoria] = useState('');


const handleCreateFondo = async () => {
  try {
    const { id, _id, categoria, ...fondoWithoutId } = newFondo;

    console.log('Datos a enviar para crear el fondo:', {
      ...fondoWithoutId,
      categoria: [selectedCategoria],
    });

    await createFondo({ ...fondoWithoutId, categoria: [selectedCategoria] });
    console.log('Nuevo Fondo creado:', newFondo);
  } catch (error) {
    console.error('Error al crear el fondo:', error.message);
  }
};


  

  return (
    
    <Container>
      <FormControl>
      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
          <Input
          name= 'nombre' 
          placeholder='Ingrese el Nombre' 
          value={newFondo.nombre}
          onChange={handleChange}/>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Descripcion</FormLabel>
          <Input
          name='descripcion'
          placeholder='Ingrese la Descripcion'
          value={newFondo.descripcion}
          onChange={handleChange}/>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Fecha de Apertura</FormLabel>
          <Input
          name='fechaApertura'
          type='date'
          value={newFondo.fechaApertura}
          onChange={handleChange}/>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Fecha de Cierre</FormLabel>
          <Input
          name='fechaCierre'
          type='date'
          value={newFondo.fechaCierre}
          onChange={handleChange}/>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Monto</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          color='gray.300'
          fontSize='1.2em'
          children='$'
          />
        <Input
          name='montoMax'
          type='number'
          placeholder='Ingrese el monto'
          value={newFondo.montoMax}
          onChange={handleChange}
          />
      </InputGroup>
          </FormControl>



          <FormControl>
        <FormLabel>Categoria</FormLabel>
        <Select
  placeholder="Seleccione una Categoria"
  value={selectedCategoria}
  onChange={(e) => setSelectedCategoria(e.target.value)}
>
  {categorias.map((categoria) => (
    <option key={categoria._id} value={categoria._id}>
      {categoria.nombre}
    </option>
  ))}
</Select>



    </FormControl>
    <Button colorScheme="blue" mr={3} onClick={handleCreateFondo}>
                        Crear Fondo
                    </Button>
    </FormControl>
    </Container>
      
    )
}
export default FondosCreate;