
import React from 'react';
import { Box, Heading, VStack, Divider } from '@chakra-ui/react';
import PostulacionesForm from '../components/PostulacionForm.jsx';

const CreateForm = () => {
  return (
    <Box p={4}>
      <VStack align="start" spacing={4}>
        <Heading as="h1" size="lg">
          Formulario
        </Heading>
        <Divider />
        <PostulacionesForm />
      </VStack>
    </Box>
  );
};

export default CreateForm;
