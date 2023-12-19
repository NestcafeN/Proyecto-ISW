import { Card, CardBody, useToast, CardFooter, Stack, Text, Heading, Divider, Button, ButtonGroup, SimpleGrid} from '@chakra-ui/react'
import { ViewIcon, DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import FondoDelete from './FondosDelete';
import { deleteFondo } from '../services/fondo.service';
import axios from '../services/root.service'


function Fondosmain({ onEliminarClick}) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const toast = useToast();
  const [fondo, setFondos] = useState([]);
  
  
  useEffect(() => { 
    axios.get('fondos')
      .then(response => {
        setFondos(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los fondos:', error);
      });
  }, []);

  const formatearFechas = (fechaApertura, fechaCierre) => {
    const fechaAperturaFormatted = new Date(fechaApertura).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const fechaCierreFormatted = new Date(fechaCierre).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    return `${fechaAperturaFormatted} - ${fechaCierreFormatted}`;
  };
  const showToast = () => {
    toast({
      title: 'Eliminar Fondo',
      description: 'El fondo ha sido eliminada con éxito',
      duration: 2000,
      isClosable: false,
      status: 'success',
      position: 'top'
    })
}
 

const handleEliminarClick = async (fondoId) => {
  const isConfirmed = await handleDeleteConfirm();
  console.log(isConfirmed)
  if (isConfirmed) {
    const response = await deleteFondo(fondoId);
    if (response.status === 200) {
      await showDeleteForm();
    }
  }
};

const handleDeleteConfirm = () => {
  onEliminarClick(fondo);
  setDeleteDialogOpen(false);
  showToast();
};


const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <SimpleGrid columns={4} spacing={4}>
      {fondo.map((fondos) => (
        <Card key={fondos._id} maxW='sm'>
          <CardBody>
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{fondos.nombre}</Heading>
              <Text>Descripcion: {fondos.descripcion}</Text>
              <Text>Monto del Fondo: {fondos.montoMax}</Text>
              <Text>
                Fechas de apertura y cierre: {formatearFechas(fondos.fechaApertura, fondos.fechaCierre)}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button onClick={() => handleEliminarClick(fondo._id)}>
                <DeleteIcon color="black" />Eliminar</Button>
            </ButtonGroup>
          </CardFooter>
          <FondoDelete
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onDelete={handleDeleteConfirm}
        fondo={fondo}
      />
        </Card>
      ))}
    </SimpleGrid>
    </>
    
  );
}

export default Fondosmain