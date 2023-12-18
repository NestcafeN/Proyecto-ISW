import React, { useState, useEffect } from 'react';
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
    Text,
} from '@chakra-ui/react';
import { updateCriterio } from '../services/criterio.service';

const EvaluarRubrica = ({ isOpen, onClose, rubrica, criterios }) => {
    if (!rubrica) {
        // Puedes manejar el caso en que rubrica sea nula, por ejemplo, cerrando el modal
        onClose();
        return null;
    }

    const { nombre, descripcion, criterios: rubricaCriterios } = rubrica;

    const [editedPuntajes, setEditedPuntajes] = useState({});

    useEffect(() => {
        // Inicializa los puntajes editados con los puntajes existentes
        const initialPuntajes = rubricaCriterios.reduce((acc, criterio) => {
            acc[criterio._id] = { puntaje: criterio.puntaje || 0 };
            return acc;
        }, {});
        setEditedPuntajes(initialPuntajes);
    }, [rubricaCriterios]);

    const handleChange = (criterioId, e) => {
        const { value } = e.target;
        setEditedPuntajes((prev) => ({
            ...prev,
            [criterioId]: { puntaje: value },
        }));
    };

    const handleSave = async () => {
        try {
            const promises = Object.entries(editedPuntajes).map(([criterioId, { puntaje }]) =>
                updateCriterio(criterioId, { puntaje })
            );
            await Promise.all(promises);
            console.log('Puntajes de criterios actualizados:', editedPuntajes);
            onClose();
        } catch (error) {
            console.error('Error al actualizar los puntajes de los criterios:', error.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ModalHeader>{`Evaluar Rubrica - ${nombre || 'Nombre no disponible'}`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb={4}>{descripcion || 'Descripción no disponible'}</Text>
                    {rubricaCriterios.map((criterio) => (
                        <FormControl mb={4} key={criterio._id}>
                            <FormLabel>{`Criterio: ${criterio.nombre || 'Nombre no disponible'}`}</FormLabel>
                            <Input
                                type="number"
                                name={`puntaje-${criterio._id}`}
                                value={editedPuntajes[criterio._id]?.puntaje || 0}
                                onChange={(e) => handleChange(criterio._id, e)}
                            />
                        </FormControl>
                    ))}
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

export default EvaluarRubrica;
