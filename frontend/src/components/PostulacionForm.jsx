import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react';
import { createPostulacion } from '../services/postulacionService';

const PostulacionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [postulacionEnviada, setPostulacionEnviada] = useState(false);

  const onSubmit = async (data) => {
    try {

      const response = await createPostulacion(data);
      console.log(response); 
      setPostulacionEnviada(true);
      alert('Postulación enviada con éxito');
    } catch (error) {
      console.error('Error al enviar la postulación:', error.message);

      alert('Error al enviar la postulación. Por favor, intenta de nuevo.');
    }
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={4}
      align="start"
      maxW="400px"
      m="auto"
    >
      <FormControl isInvalid={errors.nombreCompleto}>
        <FormLabel>Nombre Completo</FormLabel>
        <Input {...register('nombreCompleto', { required: 'Campo requerido' })} />
        <FormErrorMessage>{errors.nombreCompleto && errors.nombreCompleto.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.rut}>
        <FormLabel>RUT</FormLabel>
        <Input
          {...register('rut', {
            required: 'Campo requerido',
          })}

        />
        {errors.rut && (
          <FormErrorMessage>
            {errors.rut.message || 'Formato de RUT no válido'}
          </FormErrorMessage>
        )}
        <Text fontSize="sm" color="gray.500" mt="1">
          Coloque su RUT sin puntos ni guion.
        </Text>
      </FormControl>
      <FormControl isInvalid={errors.direccion}>
        <FormLabel>Dirección</FormLabel>
        <Input {...register('direccion', { required: 'Campo requerido' })} />
        <FormErrorMessage>{errors.direccion && errors.direccion.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.concurso}>
        <FormLabel>Concurso</FormLabel>
        <Input {...register('concurso', { required: 'Campo requerido' })} />
        <FormErrorMessage>{errors.concurso && errors.concurso.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.proyecto}>
        <FormLabel>Proyecto</FormLabel>
        <Input {...register('proyecto', { required: 'Campo requerido' })} />
        <FormErrorMessage>{errors.proyecto && errors.proyecto.message}</FormErrorMessage>
      </FormControl>

      <Button type="submit" colorScheme="teal">
        Enviar Postulación
      </Button>

      {postulacionEnviada && (
        <Box p="4" borderWidth="1px" borderRadius="md" borderColor="teal.300">
          <Text color="teal.600" fontWeight="bold">
            ¡Postulación enviada con éxito!
          </Text>
          <Button onClick={() => setPostulacionEnviada(false)} mt="2">
            Cerrar
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default PostulacionForm;