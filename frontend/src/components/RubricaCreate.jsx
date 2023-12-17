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
    Select,
    IconButton,
    Flex,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { getCriterios } from '../services/criterio.service';
import { createRubrica } from '../services/rubrica.service';

const RubricaCreate = ({ isOpen, onClose }) => {
    const [newRubrica, setNewRubrica] = useState({
        nombre: '',
        tipoFondo: '',
        puntajeMinimoAprobacion: '',
        puntajeMaximoAprobacion: '',
        criterios: [{ _id: '', nombre: '' }], // Al menos un criterio inicial
    });

    const [criterios, setCriterios] = useState([]);

    useEffect(() => {
        const fetchCriterios = async () => {
            try {
                const listaCriterios = await getCriterios();
                setCriterios(listaCriterios);
            } catch (error) {
                console.error('Error al obtener criterios:', error.message);
            }
        };
        fetchCriterios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRubrica((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value, index) => {
        const selectedCriterio = criterios.find((c) => c._id === value);
        setNewRubrica((prev) => {
            const updatedCriterios = [...prev.criterios];
            updatedCriterios[index] = { _id: selectedCriterio._id, nombre: selectedCriterio.nombre };
            return { ...prev, criterios: updatedCriterios };
        });
    };

    const handleAddCriterio = () => {
        setNewRubrica((prev) => ({
            ...prev,
            criterios: [...prev.criterios, { _id: '', nombre: '' }],
        }));
    };

    const handleRemoveCriterio = (index) => {
        if (newRubrica.criterios.length > 1) {
            setNewRubrica((prev) => {
                const updatedCriterios = [...prev.criterios];
                updatedCriterios.splice(index, 1);
                return { ...prev, criterios: updatedCriterios };
            });
        }
    };

    const handleCreateRubrica = async () => {
        try {
            // Elimina las propiedades 'id' y '_id' del objeto antes de enviar la solicitud
            const { id, _id, ...rubricaWithoutId } = newRubrica;

            // Mapear los criterios para obtener solo los _id
            const criteriosIds = newRubrica.criterios.map((criterio) => criterio._id);

            console.log('Datos a enviar para crear la rúbrica:', {
                ...rubricaWithoutId,
                criterios: criteriosIds,
            });

            await createRubrica({ ...rubricaWithoutId, criterios: criteriosIds });
            console.log('Nueva Rúbrica creada:', newRubrica);
            // Puedes realizar alguna acción adicional después de crear la rúbrica si es necesario
            // Por ejemplo, redirigir a la página de detalles de la rúbrica, etc.
            onClose(); // Cierra el modal después de crear la rúbrica
        } catch (error) {
            console.error('Error al crear la rúbrica:', error.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Crear Nueva Rúbrica</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* Formulario para la creación de la rúbrica */}
                    <Box>
                        <FormControl mb={4}>
                            <FormLabel>Nombre</FormLabel>
                            <Input type="text" name="nombre" value={newRubrica.nombre} onChange={handleChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Tipo de Fondo</FormLabel>
                            <Input type="text" name="tipoFondo" value={newRubrica.tipoFondo} onChange={handleChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Puntaje Mínimo de Aprobación</FormLabel>
                            <Input
                                type="text"
                                name="puntajeMinimoAprobacion"
                                value={newRubrica.puntajeMinimoAprobacion}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Puntaje Máximo de Aprobación</FormLabel>
                            <Input
                                type="text"
                                name="puntajeMaximoAprobacion"
                                value={newRubrica.puntajeMaximoAprobacion}
                                onChange={handleChange}
                            />
                        </FormControl>
                        {newRubrica.criterios.map((criterio, index) => (
                            <Flex key={`flex_${criterio._id || index}`} mb={4} align="center">
                                <FormLabel>Criterio de Evaluación</FormLabel>
                                <Select
                                    value={criterio._id || ''}
                                    onChange={(e) => handleSelectChange(e.target.value, index)}
                                    placeholder="Seleccionar un Criterio"
                                >
                                    {criterios.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.nombre}
                                        </option>
                                    ))}
                                </Select>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    colorScheme="red"
                                    aria-label="Eliminar Criterio"
                                    onClick={() => handleRemoveCriterio(index)}
                                    ml={2}
                                    isDisabled={newRubrica.criterios.length === 1}
                                />
                            </Flex>
                        ))}
                        <IconButton
                            icon={<AddIcon />}
                            colorScheme="green"
                            aria-label="Agregar Criterio"
                            onClick={handleAddCriterio}
                        >
                            Agregar Criterio
                        </IconButton>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleCreateRubrica}>
                        Crear Rúbrica
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RubricaCreate;
