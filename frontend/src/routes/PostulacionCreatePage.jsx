import React from 'react';
import { Box, Heading, VStack, Divider } from '@chakra-ui/react';
import PostulacionesForm from '../components/PostulacionForm.jsx';

const CreateForm = () => {
  return (
    <Box p={4}>
      <VStack align="start" spacing={4}>
        <Box
          color="black" // Texto blanco
          p={4} // Padding interno
          borderRadius="md" // Bordes redondeados
          textAlign="center" // Texto centrado
          w="100%" // Ancho del banner al 100%
        >
          <Heading as="h1" size="lg">
            Formulario
          </Heading>
        </Box>
        <Divider />
        <PostulacionesForm />
      </VStack>
    </Box>
  );
};

export default CreateForm;