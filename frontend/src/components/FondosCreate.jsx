import { Container, FormControl, FormLabel, Input, Select, InputGroup,InputLeftElement, Button } from '@chakra-ui/react'
import axios from '../services/root.service.js';
import React, { useEffect, useState } from 'react';

function FondosCreate({ formFondoData, setFormFondoData, handleCreateFondo}) {

  const handleSubmit = () => {
    handleCreateFondo();
  };

  const [categorias, setCategorias] = useState([]);
    
  useEffect(() => {
    axios.get('categorias') // funciona
      .then(response => {
        setCategorias(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener las categorias:', error);
      });
  }, []);

  return (
    <Container>
      <FormControl>
      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
          <Input
          name= 'nombre' 
          placeholder='Ingrese el Nombre' 
          value={formFondoData.nombre}
          onChange={(e) => setFormFondoData({ ...formFondoData, nombre: e.target.value })}/>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Descripcion</FormLabel>
          <Input
          name='descripcion'
          placeholder='Ingrese la Descripcion'
          value={formFondoData.descripcion}
          onChange={(e) => setFormFondoData({ ...formFondoData, descripcion: e.target.value })}/>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Fecha de Apertura</FormLabel>
          <Input
          name='fechaApertura'
          type='date'
          value={formFondoData.fechaApertura}
          onChange={(e) => setFormFondoData({ ...formFondoData, fechaApertura: e.target.value })}/>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Fecha de Cierre</FormLabel>
          <Input
          name='fechaCierre'
          type='date'
          value={formFondoData.fechaCierre}
          onChange={(e) => setFormFondoData({ ...formFondoData, fechaCierre: e.target.value })}/>
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
          value={formFondoData.montoMax}
          onChange={(e) => setFormFondoData({ ...formFondoData, montoMax: e.target.value })}
          />
      </InputGroup>
          </FormControl>

          <FormControl>
        <FormLabel>Categoria</FormLabel>
          <Select
            placeholder="Seleccione una Categoria"
            value={formFondoData.categoria}
            onChange={(e) => setFormFondoData({ ...formFondoData, categoria: e.target.value })}>
              
          {categorias.map((categoria) => (
            
        <option key={categoria._id} value={categoria._id}>
        {categoria.nombre}
        </option>
  ))}
</Select>
    </FormControl>
    <Button colorScheme='teal' variant='solid' onClick={handleSubmit}> Crear </Button>
    </FormControl>
    </Container>
      
    )
}
export default FondosCreate;