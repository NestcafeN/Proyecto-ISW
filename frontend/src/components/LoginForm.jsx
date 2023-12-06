import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Button, FormControl, FormLabel, Input, Box, Heading  } from '@chakra-ui/react'


function LoginForm() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };


  return (
  <>
  <Container>
    <Box>
      <Heading>Inicio de sesión</Heading>
    </Box>
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl>
      <FormLabel>Email</FormLabel>
        <Input placeholder='nombre@ejemplo.com' type= 'email'
              {...register('email', { required: true })}/>
      </FormControl>
  
    <FormControl>
      <FormLabel>Contraseña</FormLabel>
      <Input placeholder='contraseña' type='password'
            {...register('password', { required: true })}/> 
            {errors.exampleRequired && <span>This field is required</span>}
    </FormControl>
    
    <Box margin="15px">
    <Button type='submit' colorScheme='teal' variant='solid' >
      Iniciar sesión
    </Button>
    </Box>
    </form>
    </Container>
    
  </>
  )
}

export default LoginForm;
