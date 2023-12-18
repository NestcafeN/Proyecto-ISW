import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { updateCriterio } from '../services/criterio.service';

const CriterioEdit = ({ isOpen, onClose, criterio }) => {
    const { nombre, descripcion } = criterio;

    const [editedCriterio, setEditedCriterio] = useState({
        nombre,
        descripcion,
        puntaje: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCriterio((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const { _id, ...dataWithoutId } = editedCriterio; // Excluye _id de la solicitud
            await updateCriterio(criterio._id, { ...dataWithoutId, puntaje: 0 });
            console.log('Cambios guardados:', editedCriterio);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error al guardar cambios:', error.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }}>
                <ModalHeader>Editar Criterio</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Nombre</FormLabel>
                        <Input type="text" name="nombre" value={editedCriterio.nombre} onChange={handleChange} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Descripción</FormLabel>
                        <Input type="text" name="descripcion" value={editedCriterio.descripcion} onChange={handleChange} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                        Guardar Cambios
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CriterioEdit;