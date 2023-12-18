import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { createCriterios } from '../services/criterio.service';

const CriterioCreate = ({ isOpen, onClose }) => {
    const [newCriterio, setNewCriterio] = useState({
        nombre: '',
        descripcion: '',
        puntaje: '',
    });

    const [criterios, setCriterios] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCriterio((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateCriterio = async () => {
        try {
            if (!newCriterio.nombre || !newCriterio.descripcion) {
                console.error('Nombre y descripción son obligatorios.');
                return;
            }
            const response = await createCriterios(newCriterio);
            console.log('Respuesta del servicio al crear el criterio:', response);
            onClose();
        } catch (error) {
            console.error('Error al crear el criterio:', error.message);
        }
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Crear Nuevo Criterio</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <FormControl mb={4}>
                            <FormLabel>Nombre</FormLabel>
                            <Input type="text" name="nombre" value={newCriterio.nombre} onChange={handleChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Descripción</FormLabel>
                            <Input type="text" name="descripcion" value={newCriterio.descripcion} onChange={handleChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Puntaje</FormLabel>
                            <Input type="text" name="puntaje" value={newCriterio.puntaje} onChange={handleChange} />
                        </FormControl>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleCreateCriterio}>
                        Crear Criterio
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CriterioCreate;
