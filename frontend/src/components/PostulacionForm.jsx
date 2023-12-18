
import React from 'react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { createPostulacion } from '../services/postulacionService';

const PostulacionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [postulacionEnviada, setPostulacionEnviada] = useState(false);

  const onSubmit = async (data) => {
    try {
      // Lógica para enviar la postulación al backend utilizando postulacionService
      const response = await createPostulacion(data);
      console.log(response); // Manejar la respuesta según tus necesidades
      setPostulacionEnviada(true);
      alert('Postulación enviada con éxito');
    } catch (error) {
      console.error('Error al enviar la postulación:', error.message);
      // Manejar el error según tus necesidades
      alert('Error al enviar la postulación. Por favor, intenta de nuevo.');
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
      <FormControl>
        <FormLabel>Nombre Completo</FormLabel>
        <Input {...register('nombreCompleto', { required: 'Campo requerido' })} />
        {errors.nombreCompleto && <span>{errors.nombreCompleto.message}</span>}
      </FormControl>

      <FormControl>
        <FormLabel>RUT</FormLabel>
        <Input {...register('rut', { required: 'Campo requerido' })} />
        {errors.rut && <span>{errors.rut.message}</span>}
      </FormControl>

      <FormControl>
        <FormLabel>Concurso</FormLabel>
        <Input {...register('concurso', { required: 'Campo requerido' })} />
        {errors.concurso && <span>{errors.concurso.message}</span>}
      </FormControl>

      <FormControl>
        <FormLabel>Correo Electrónico</FormLabel>
        <Input {...register('correo', { required: 'Campo requerido' })} />
        {errors.correo && <span>{errors.correo.message}</span>}
      </FormControl>

      <FormControl>
        <FormLabel>Dirección</FormLabel>
        <Input {...register('direccion', { required: 'Campo requerido' })} />
        {errors.direccion && <span>{errors.direccion.message}</span>}
      </FormControl>

      <FormControl>
        <FormLabel>Proyecto</FormLabel>
        <Input {...register('proyecto', { required: 'Campo requerido' })} />
        {errors.proyecto && <span>{errors.proyecto.message}</span>}
      </FormControl>

      <Button type="submit">Enviar Postulación</Button>
    
     {postulacionEnviada && (
      <div>
        <p>Postulación enviada con éxito.</p>
        <Button onClick={() => setPostulacionEnviada(false)}>Cerrar</Button>
      </div>
    )}
  </VStack>
  );
};

export default PostulacionForm;
