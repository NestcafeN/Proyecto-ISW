import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardHeader, CardBody, CardFooter, Divider, Flex, HStack, Heading, Text, useToast } from '@chakra-ui/react';
import { ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import CriterioDelete from '../components/CriterioDelete';

const CriterioCard = ({ criterio, onEditarClick, onEliminarClick }) => {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { nombre, descripcion, _id } = criterio;
    const toast = useToast();

    const showToast = () => {
        toast({
            title: 'Eliminar Criterio',
            description: 'El Criterio ha sido eliminado con éxito',
            duration: 2000,
            isClosable: false,
            status: 'success',
            position: 'top'
        })
    }

    const handleEliminarClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        onEliminarClick(criterio);
        setDeleteDialogOpen(false);
        showToast();
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const CriterioCardStyles = {
        bg: "gray.100",
        h: "190px",
        w: "350px",
        borderTop: "8px",
        borderColor: "blue.200"
    };

    const IconStyle = {
        marginRight: "8px"
    };

    return (
        <Card key={_id} sx={CriterioCardStyles}>
            <CardHeader>
                <Flex gap={5}>
                    <Box>
                        <Heading as="h3" size="sm">{nombre}</Heading>
                        <Text>{descripcion}</Text>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody color="gray.500"></CardBody>
            <Divider borderColor="black" />
            <CardFooter>
                <HStack h="20px">
                    <Button onClick={() => onEditarClick(criterio)}><EditIcon color="black" sx={IconStyle} />Editar</Button>
                    <Button onClick={handleEliminarClick}><DeleteIcon color="black" sx={IconStyle} />Eliminar</Button>
                </HStack>
            </CardFooter>
            <CriterioDelete
                isOpen={isDeleteDialogOpen}
                onClose={handleDeleteCancel}
                onDelete={handleDeleteConfirm}
                criterio={criterio}
            />
        </Card>
    );
};

CriterioCard.propTypes = {
    criterio: PropTypes.object.isRequired,
    onEditarClick: PropTypes.func.isRequired,
    onEliminarClick: PropTypes.func.isRequired,
};

export default CriterioCard;
