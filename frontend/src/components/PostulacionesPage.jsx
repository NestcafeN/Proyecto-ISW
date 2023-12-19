import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Heading,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { getAllPostulaciones, deletePostulacion, updateEstadoPostulacion } from '../services/postulacionService';

const PostulacionesPage = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostulacion, setSelectedPostulacion] = useState(null);
  const [selectedEstado, setSelectedEstado] = useState('');

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

  const handleModificarEstadoClick = (postulacion) => {
    setSelectedPostulacion(postulacion);
    setSelectedEstado(''); // Reinicia el estado al abrir el modal
    setIsModalOpen(true);
  };

  const handleEstadoChange = (event) => {
    setSelectedEstado(event.target.value);
  };

  const handleGuardarEstadoClick = async () => {
    try {
      await updateEstadoPostulacion(selectedPostulacion._id, selectedEstado);
      const updatedPostulaciones = await getAllPostulaciones();
      setPostulaciones(updatedPostulaciones.data);
    } catch (error) {
      console.error('Error al actualizar estado:', error.message);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <Box p={8} d="flex" w="100%" justify="center">
      <VStack align="start" spacing={8} w="50%">
        <Heading as="h1" size="lg">
          Todas las Postulaciones
        </Heading>
        <Divider />
        <UnorderedList styleType="none" w="100%">
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
              w="100%"
            >
              <VStack align="start" spacing={2} w="100%">
                <Heading as="h2" size="md">
                  {postulacion.nombreCompleto}
                </Heading>
                <p>RUT: {postulacion.rut}</p>
                <p>Correo: {postulacion.correo}</p>
                <p>Direcci贸n: {postulacion.direccion}</p>
              </VStack>
            </ListItem>
          ))}
        </UnorderedList>
      </VStack>

      <VStack align="start" spacing={4} w="50%">
        <Heading as="h2" size="md">
          Detalles de la Postulaci贸n
        </Heading>
        <Divider />
        {selectedPostulacion && (
          <Box>
            <Table variant="simple" colorScheme="teal" w="100%">
              <Thead>
                <Tr>
                  <Th>Concurso</Th>
                  <Th>Estado</Th>
                  <Th>Fecha de Postulaci贸n</Th>
                  <Th>Proyecto</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{selectedPostulacion.concurso}</Td>
                  <Td>{selectedPostulacion.estado}</Td>
                  <Td>{new Date(selectedPostulacion.fechaPostulacion).toLocaleDateString()}</Td>
                  <Td>{selectedPostulacion.proyecto}</Td>
                </Tr>
              </Tbody>
            </Table>
            <VStack spacing={4} w="100%">
              <Button colorScheme="red" onClick={handleEliminarClick} w="100%">
                Eliminar Postulaci贸n
              </Button>
              <Button colorScheme="teal" onClick={() => handleModificarEstadoClick(selectedPostulacion)} w="100%">
                Modificar Estado
              </Button>
            </VStack>
          </Box>
        )}
      </VStack>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modificar Estado</ModalHeader>
          <ModalBody>
            <FormControl w="100%">
              <Select value={selectedEstado} onChange={handleEstadoChange}>
                <option value="ACEPTADO">ACEPTADO</option>
                <option value="RECHAZADO">RECHAZADO</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleGuardarEstadoClick}>
              Guardar
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PostulacionesPage;