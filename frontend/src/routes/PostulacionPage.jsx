
import React from 'react';
import { Box, Heading, VStack, Divider } from '@chakra-ui/react';
import PostulacionesPage from '../components/PostulacionesPage';

const TodasPostulaciones = () => {
  return (
    <Box p={4}>
      <VStack align="start" spacing={4}>
        <Heading as="h1" size="lg">
          Postulaciones
        </Heading>
        <Divider />
        <PostulacionesPage />
      </VStack>
    </Box>
  );
};

export default TodasPostulaciones;
