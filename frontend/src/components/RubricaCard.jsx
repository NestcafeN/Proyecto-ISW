import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Flex, Box, CardBody, CardFooter, Divider, Heading, Text, Button, HStack, useToast } from '@chakra-ui/react';
import { ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import RubricaDelete from './RubricaDelete';


const RubricaCard = ({ rubrica, onVerClick, onEditarClick, onEvaluarClick }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { nombre, postulacion, _id } = rubrica;
  const toast = useToast();

  const showToast = () => {
    toast({
      title: 'Eliminar Rúbrica',
      description: 'La Rúbrica ha sido eliminada con éxito',
      duration: 2000,
      isClosable: false,
      status: 'success',
      position: 'top',
    });
  };

  const handleEliminarClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onEliminarClick(rubrica);
    setDeleteDialogOpen(false);
    showToast();
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const RubricaCardStyles = {
    bg: 'white',
    h: '220px',
    w: '350px',
    borderTop: '8px',
    borderColor: 'blue.500',
  };

  const IconStyle = {
    marginRight: '8px',
  };

  return (
    <Card key={_id} sx={RubricaCardStyles}>
      <CardHeader>
        <Flex gap={5}>
          <Box w="50px" h="50px">
            <Text>E</Text>
          </Box>
          <Box>
            <Heading as="h3" size="sm">{nombre}</Heading>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody color="gray.500"></CardBody>
      <Divider borderColor="gray.200" />
      <CardFooter>
        <HStack h="20px">
          <Button onClick={() => onVerClick(rubrica)}>
            <ViewIcon color="black" sx={IconStyle} />
            Ver
          </Button>
          <Button onClick={() => onEditarClick(rubrica)}><EditIcon color="black" sx={IconStyle} />Editar</Button>
          <Button onClick={handleEliminarClick}><DeleteIcon color="black" sx={IconStyle} />Eliminar</Button>
          {onEvaluarClick && (
            <Button onClick={() => onEvaluarClick(rubrica)}>
              Evaluar
            </Button>
          )}
        </HStack>
      </CardFooter>
      <RubricaDelete
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onDelete={handleDeleteConfirm}
        rubrica={rubrica}
      />
    </Card>
  );
};

RubricaCard.propTypes = {
  rubrica: PropTypes.object.isRequired,
  onVerClick: PropTypes.func.isRequired,
  onEditarClick: PropTypes.func,
  onEvaluarClick: PropTypes.func,
  onEliminarClick: PropTypes.func,
};

export default RubricaCard;
