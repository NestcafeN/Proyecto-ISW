import { Container, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createCategoria } from '../services/categoria.service';

function CategoriaCreate() {
  const [newCategoria, setNewCategoria] = useState({
    nombre: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategoria((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCategoria = async () => {
    try {
      await createCategoria(newCategoria);
      console.log('Nueva Categoría creada:', newCategoria);
      // Puedes realizar alguna acción adicional después de crear la categoría si es necesario
    } catch (error) {
      console.error('Error al crear la categoría:', error.message);
    }
  };

  return (
    <Container>
      <FormControl>
        <FormLabel>Nombre de la Categoría</FormLabel>
        <Input
          name="nombre"
          placeholder="Ingrese el Nombre de la Categoría"
          value={newCategoria.nombre}
          onChange={handleChange}
        />
      </FormControl>

      <Button colorScheme="blue" mt={4} onClick={handleCreateCategoria}>
        Crear Categoría
      </Button>
    </Container>
  );
}

export default CategoriaCreate;
