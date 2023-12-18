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
    Select,
    IconButton,
    Flex,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { getCriterios } from '../services/criterio.service';
import { getCategorias } from '../services/categoria.service';
import { getPostulaciones } from '../services/postulacion.service';
import { updateRubrica } from '../services/rubrica.service';


const RubricaEdit = ({ isOpen, onClose, rubrica }) => {
    console.log('Rúbrica recibida en RubricaEdit:', rubrica);
    const [editedRubrica, setEditedRubrica] = useState({
        _id: rubrica._id || '',
        nombre: rubrica.nombre || '',
        categorias: rubrica.categorias || '',
        postulacion: rubrica.postulacion || '',
        criterios: rubrica.criterios || [],
        puntajeMinimoAprobacion: rubrica.puntajeMinimoAprobacion || '',
        puntajeMaximoAprobacion: rubrica.puntajeMaximoAprobacion || '',
    });

    const [criterios, setCriterios] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [postulaciones, setPostulaciones] = useState([]);
    const [nextCriterioId] = useState(1);
    const [selectedCriterios, setSelectedCriterios] = useState(
        (editedRubrica.criterios || []).map((c) => c._id) || []
    );

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

    useEffect(() => {
        console.log('Rúbrica recibida en RubricaEdit:', rubrica);
        setEditedRubrica((prev) => ({
            ...prev,
            id: rubrica._id || '',
            nombre: rubrica.nombre || '',
            categorias: rubrica.categorias || '', // Asegúrate de que categorias refleje el valor correcto
            postulacion: rubrica.postulacion || '',
            criterios: rubrica.criterios || [],
            puntajeMinimoAprobacion: rubrica.puntajeMinimoAprobacion || '',
            puntajeMaximoAprobacion: rubrica.puntajeMaximoAprobacion || '',
        }));
        handleCategoriaChange(rubrica.categorias || ''); // Asegúrate de que categorias se establezca correctamente aquí
        handlePostulacionChange(rubrica.postulacion || '');
    }, [rubrica]);


    const handleCategoriaChange = (value) => {
        setEditedRubrica((prev) => ({ ...prev, categorias: value }));
    };

    const handlePostulacionChange = (value) => {
        setEditedRubrica((prev) => ({ ...prev, postulacion: value }));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedRubrica((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value, index) => {
        const selectedCriterio = criterios.find((c) => c._id === value);
        console.log('Selected Criterio:', selectedCriterio);
        setSelectedCriterios((prev) => {
            const updatedSelectedCriterios = [...prev];
            updatedSelectedCriterios[index] = selectedCriterio;
            console.log('Updated Selected Criterios:', updatedSelectedCriterios);
            return updatedSelectedCriterios;
        });
    };

    const handleAddCriterio = () => {
        if (selectedCriterios && selectedCriterios.length > 0) {
            console.log('Adding Criterio:', selectedCriterios[0]);

            setEditedRubrica((prev) => ({
                ...prev,
                criterios: [
                    ...prev.criterios,
                    { ...selectedCriterios[0], id: `new_${nextCriterioId}` }
                ]
            }));

            console.log('Edited Rubrica after adding criterio:', editedRubrica);
        } else {
            console.error('No se seleccionó ningún criterio');
        }
    };


    const handleRemoveCriterio = (index) => {
        console.log('Removing Criterio at index:', index);
        setEditedRubrica((prev) => {
            const updatedCriterios = [...prev.criterios];
            updatedCriterios.splice(index, 1);

            return { ...prev, criterios: updatedCriterios };
        });

        setSelectedCriterios((prev) => {
            const updatedSelectedCriterios = [...prev];
            updatedSelectedCriterios.splice(index, 1);

            return updatedSelectedCriterios;
        });
    };

    const handleSave = async () => {
        try {
            // Elimina las propiedades 'id' y '_id' del objeto antes de enviar la solicitud
            const { id, _id, ...rubricaWithoutId } = editedRubrica;

            // Mapear los selectedCriterios para obtener solo los _id
            const criteriosIds = (selectedCriterios || []).map((criterio) => criterio._id);

            console.log('Edited Rubrica before save:', editedRubrica);
            console.log('Selected Criterios:', selectedCriterios);

            await updateRubrica(editedRubrica._id, { ...rubricaWithoutId, criterios: criteriosIds });
            console.log('Cambios guardados:', editedRubrica);
            onClose();
            window.location.reload(); // Esto recargará la página
        } catch (error) {
            console.error('Error al guardar cambios:', error.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }}>
                <ModalHeader>Editar Rúbrica</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Nombre</FormLabel>
                        <Input type="text" name="nombre" value={editedRubrica.nombre} onChange={handleChange} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Categoría</FormLabel>
                        <Select
                            name="categorias"
                            value={editedRubrica.categorias}
                            onChange={(e) => handleCategoriaChange(e.target.value)}
                            placeholder={editedRubrica.categorias ? editedRubrica.categorias.nombre : 'Seleccionar una Categoría'}
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
                            value={editedRubrica.postulacion}
                            onChange={(e) => handlePostulacionChange(e.target.value)}
                            placeholder={editedRubrica.postulacion ? editedRubrica.categorias.postulacion : 'Seleccionar una Postulación'}
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
                            value={editedRubrica.puntajeMinimoAprobacion}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Puntaje Máximo de Aprobación</FormLabel>
                        <Input
                            type="text"
                            name="puntajeMaximoAprobacion"
                            value={editedRubrica.puntajeMaximoAprobacion}
                            onChange={handleChange}
                        />
                    </FormControl>
                    {(editedRubrica.criterios || []).map((criterio, index) => (
                        <Flex key={`flex_${criterio._id || index}`} mb={4} align="center">
                            <FormLabel>Criterio de Evaluación</FormLabel>
                            <Select
                                value={selectedCriterios[index] ? selectedCriterios[index]._id : ''}
                                onChange={(e) => handleSelectChange(e.target.value, index)}
                                placeholder={criterio.nombre || 'Seleccionar un Criterio'}
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
                                isDisabled={editedRubrica.criterios.length === 1}
                            />
                        </Flex>
                    ))}
                    <IconButton
                        icon={<AddIcon />}
                        colorScheme="green"
                        aria-label="Agregar Criterio"
                        onClick={() => handleAddCriterio()}
                    >
                        Agregar Criterio
                    </IconButton>
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

export default RubricaEdit;
