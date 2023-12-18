import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Heading,
  Divider,
  ListItem,
  UnorderedList,
  Button,
  Select,
} from '@chakra-ui/react';
import { getAllPostulaciones, deletePostulacion, updateEstadoPostulacion } from '../services/postulacionService';

const PostulacionesPage = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [selectedPostulacion, setSelectedPostulacion] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');

  useEffect(() => {
    const fetchPostulaciones = async () => {
      try {
        const response = await getAllPostulaciones();
        setPostulaciones(response.data);
      } catch (error) {
        console.error('Error fetching postulaciones:', error.message);
      }
    };

    fetchPostulaciones();
  }, []);

  const handlePostulacionClick = (postulacion) => {
    setSelectedPostulacion(postulacion);
  };

  const handleEliminarClick = async () => {
    try {
      if (selectedPostulacion) {
        await deletePostulacion(selectedPostulacion._id);
        setPostulaciones(postulaciones.filter((p) => p._id !== selectedPostulacion._id));
        setSelectedPostulacion(null);
      }
    } catch (error) {
      console.error('Error deleting postulacion:', error.message);
    }
  };

  const handleActualizarEstadoClick = async () => {
    try {
      if (selectedPostulacion && (nuevoEstado === 'ACEPTADO' || nuevoEstado === 'RECHAZADO')) {
        await updateEstadoPostulacion(selectedPostulacion._id, nuevoEstado);
        // Actualiza la lista de postulaciones después de la actualización del estado
        const response = await getAllPostulaciones();
        setPostulaciones(response.data);
      }
    } catch (error) {
      console.error('Error actualizando estado de postulacion:', error.message);
    }
  };

  return (
    <Box p={4} d="flex" w="100%" gap={8}>
      <VStack align="start" spacing={4} w="50%">
        <Heading as="h1" size="lg">
          Todas las Postulaciones
        </Heading>
        <Divider />
        {/* Renderiza aquí la lista de postulaciones */}
        <UnorderedList styleType="none">
          {postulaciones.map((postulacion) => (
            <ListItem
              key={postulacion._id}
              onClick={() => handlePostulacionClick(postulacion)}
              p={4}
              borderRadius="md"
              boxShadow="md"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ boxShadow: 'lg', bg: 'teal.50' }}
            >
              {/* Renderiza los detalles básicos de cada postulación */}
              <VStack align="start" spacing={2}>
                <Heading as="h2" size="md">
                  {postulacion.nombreCompleto}
                </Heading>
                <p>RUT: {postulacion.rut}</p>
                <p>Correo: {postulacion.correo}</p>
                {/* Vista previa de detalles */}
                <p>Dirección: {postulacion.direccion}</p>
              </VStack>
            </ListItem>
          ))}
        </UnorderedList>
      </VStack>

      {/* Columna derecha para mostrar detalles adicionales */}
      <VStack align="start" spacing={4} w="50%">
        <Heading as="h2" size="md">
          Detalles de la Postulación
        </Heading>
        <Divider />
        {/* Muestra más detalles de la postulación */}
        {selectedPostulacion && (
          <Box>
            <Table variant="simple" colorScheme="teal" w="100%">
              <Thead>
                <Tr>
                  <Th>Concurso</Th>
                  <Th>Estado</Th>
                  <Th>Fecha de Postulación</Th>
                  <Th>Proyecto</Th>
                  {/* Agrega más encabezados según tu modelo de datos */}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{selectedPostulacion.concurso}</Td>
                  <Td>{selectedPostulacion.estado}</Td>
                  <Td>{new Date(selectedPostulacion.fechaPostulacion).toLocaleDateString()}</Td>
                  <Td>{selectedPostulacion.proyecto}</Td>
                  {/* Agrega más celdas según tu modelo de datos */}
                </Tr>
              </Tbody>
            </Table>
            <Button colorScheme="red" mt={4} onClick={handleEliminarClick}>
              Eliminar Postulación
            </Button>
            <Select
              placeholder="Seleccione Nuevo Estado"
              value={nuevoEstado}
              onChange={(e) => setNuevoEstado(e.target.value)}
              mt={4}
            >
              <option value="ACEPTADO">ACEPTADO</option>
              <option value="RECHAZADO">RECHAZADO</option>
            </Select>
            <Button colorScheme="teal" mt={4} onClick={handleActualizarEstadoClick}>
              Actualizar Estado
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default PostulacionesPage;
