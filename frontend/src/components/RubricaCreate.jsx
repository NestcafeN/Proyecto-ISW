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
import { getCategorias } from '../services/categoria.service';
import { getPostulaciones } from '../services/postulacion.service';
import { createRubrica } from '../services/rubrica.service';

const RubricaCreate = ({ isOpen, onClose }) => {
    const [newRubrica, setNewRubrica] = useState({
        nombre: '',
        categorias: '',
        postulacion: '',
        criterios: [{ _id: '', nombre: '' }],
        puntajeMinimoAprobacion: '',
        puntajeMaximoAprobacion: '',
    });

    const [criterios, setCriterios] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [postulaciones, setPostulaciones] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaCriterios = await getCriterios();
                const listaCategorias = await getCategorias();
                const listaPostulaciones = await getPostulaciones();

                setCriterios(listaCriterios);
                setCategorias(listaCategorias);
                setPostulaciones(listaPostulaciones);
            } catch (error) {
                console.error('Error al obtener datos:', error.message);
            }
        };
        fetchData();
    }, []);

    const handleCategoriaChange = (value) => {
        setNewRubrica((prev) => ({ ...prev, categorias: value }));
    };

    const handlePostulacionChange = (value) => {
        setNewRubrica((prev) => ({ ...prev, postulacion: value }));
    };

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
            const { id, _id, ...rubricaWithoutId } = newRubrica;
            const criteriosIds = newRubrica.criterios.map((criterio) => criterio._id);

            await createRubrica({ ...rubricaWithoutId, criterios: criteriosIds });
            console.log('Nueva Rúbrica creada:', newRubrica);
            onClose();
            window.location.reload(); // Esto recargará la página
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
                    <Box>
                        <FormControl mb={4}>
                            <FormLabel>Nombre</FormLabel>
                            <Input type="text" name="nombre" value={newRubrica.nombre} onChange={handleChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Categoría</FormLabel>
                            <Select
                                name="categorias"
                                value={newRubrica.categorias}
                                onChange={(e) => handleCategoriaChange(e.target.value)}
                                placeholder="Seleccionar una Categoría"
                            >
                                {categorias.map((categorias) => (
                                    <option key={categorias._id} value={categorias._id}>
                                        {categorias.nombre}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Postulación</FormLabel>
                            <Select
                                name="postulacion"
                                value={newRubrica.postulacion}
                                onChange={(e) => handlePostulacionChange(e.target.value)}
                                placeholder="Seleccionar una Postulación"
                            >
                                {postulaciones.map((postulacion) => (
                                    <option key={postulacion._id} value={postulacion._id}>
                                        {postulacion.proyecto}
                                    </option>
                                ))}
                            </Select>
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