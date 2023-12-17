import { Card, CardBody, CardFooter, Stack, Text, Heading, Divider, Button, ButtonGroup, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import axios from '../services/root.service.js';





function Fondosmain() {
  
  const [fondo, setFondos] = useState([]);
  
  useEffect(() => { //funciona 
    axios.get('fondos')
      .then(response => {
        setFondos(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los fondos:', error);
      });
  }, []);

  return (
    <>
      <SimpleGrid columns={4} spacing={4}>
      {fondo.map((fondos) => (
        <Card key={fondos._id} maxW='sm'>
          <CardBody>
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{fondos.nombre}</Heading>
              <Text>{fondos.descripcion}</Text>
              <Text>Monto del Fondo: {fondos.montoMax}</Text>
              <Text>
                Fechas de apertura y cierre: {fondos.fechaApertura} - {fondos.fechaCierre}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='cyan'>
                Ver detalles
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
    </>
    
  );
}

export default Fondosmain