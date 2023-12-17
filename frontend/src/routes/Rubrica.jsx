import { getRubrica, deleteRubrica } from '../services/rubrica.service';
import React, { useEffect, useState } from 'react';
import {
    Container,
    Heading,
    Box,
    Flex,
    InputGroup,
    InputRightElement,
    Icon,
    SimpleGrid,
    FormLabel,
    Input,
    FormHelperText,
    FormControl,
    Tab,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    IconButton
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import { Form } from 'react-router-dom';
import RubricaCard from '../components/RubricaCard';
import RubricaCreate from '../components/RubricaCreate';
import RubricaView from '../components/RubricaView';
import RubricaEdit from '../components/RubricaEdit';
import styled from '@emotion/styled';


const SearchForm = () => (
    <Flex my="50px" marginLeft={20}>
        <Box maxW="480px">
            <Form>
                <FormControl margeright="90px">
                    <FormLabel>Buscar rúbrica:</FormLabel>
                    <Input type="text" name="title" />
                    <FormHelperText>Ingrese el nombre de la rúbrica que desea encontrar.</FormHelperText>
                </FormControl>
            </Form>
        </Box>
    </Flex>
);

const Rubrica = () => {
    const [rubricas, setRubricas] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedRubrica, setSelectedRubrica] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [editingRubrica, setEditingRubrica] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        getRubrica().then((response) => {
            // Asegúrate de que response sea un array antes de establecer el estado
            if (Array.isArray(response)) {
                setRubricas(response);
                console.log(response);
            } else {
                console.error("La respuesta de getRubrica() no es un array.");
            }
        });
    }, []);

    const StyledTitleBox = styled(Box, {
        shouldForwardProp: (propName) => propName !== 'sx',
    })`
        p: 1px;
        bg: gray.300;
        color: black;
        m: 50px;
        text-align: center;
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
      `;

    const handleCrearRubricaClick = () => {
        // Lógica para manejar la creación de una nueva rúbrica
        // Puedes redirigir a una nueva página, abrir un modal, etc.
        console.log('Crear nueva rúbrica');
    };
    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleVerClick = (rubrica) => {
        setSelectedRubrica(rubrica);
        setIsViewOpen(true);
    };

    const handleEditarClick = (rubrica) => {
        setEditingRubrica(rubrica);
        setIsEditing(true);
    };

    const handleCancelarEdicion = () => {
        setEditingRubrica(null);
        setIsEditing(false);
    };

    const handleGuardarEdicion = async () => {
        try {
            await updateRubrica(editingRubrica);
            setRubricas((prevRubricas) =>
                prevRubricas.map((r) => (r._id === editingRubrica._id ? editingRubrica : r))
            );
            setIsEditing(false);
            console.log(`Rúbrica ${editingRubrica.nombre} editada con éxito.`);
        } catch (error) {
            // Maneja errores si es necesario
            console.error(`Error al editar la rúbrica: ${error.message}`);
        }
    };

    const handleEliminarClick = async (rubrica) => {
        try {
            await deleteRubrica(rubrica._id);
            setRubricas((prevRubricas) => prevRubricas.filter((r) => r._id !== rubrica._id));
            console.log(`Rúbrica ${rubrica.nombre} eliminada con éxito.`);
        } catch (error) {
            console.error(`Error al eliminar la rúbrica: ${error.message}`);
        }
    };

    return (
        <div>
            <Container>

                <StyledTitleBox>
                    <Heading my="10px" fontSize="xl" fontWeight="500">Rubricas de Evaluación</Heading>
                </StyledTitleBox>



                <Tabs mt="40px" p="20px" variant="enclosed">
                    <TabList>
                        <Tab _selected={{ color: 'white', bg: 'blue.400' }}>Todas las Rúbricas</Tab>
                        <Tab _selected={{ color: 'white', bg: 'green.500' }}>Rúbricas Aprobadas</Tab>
                        <Tab _selected={{ color: 'white', bg: 'red.600' }}>Rúbricas Rechazadas</Tab>
                    </TabList>

                    <Flex justify="space-between" align="center" mb="4">
                        {/* Botón de Crear a la izquierda */}
                        <IconButton
                            icon={<Icon as={AddIcon} />}
                            aria-label="Crear nueva rúbrica"
                            size="lg"
                            onClick={handleOpenCreateModal}
                        />
                        {isCreateModalOpen && (
                            <RubricaCreate isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />
                        )}

                        {/* Formulario de búsqueda a la derecha */}
                        <InputGroup>
                            <Input type="text" placeholder="Buscar rúbrica..." />
                            <InputRightElement>
                                <IconButton
                                    icon={<SearchIcon />}
                                    aria-label="Buscar rúbrica"
                                    size="sm"
                                // Agrega la lógica para manejar la búsqueda
                                />
                            </InputRightElement>
                        </InputGroup>
                    </Flex>

                    {isCreateModalOpen && (
                        <RubricaCreate isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />
                    )}

                    <TabPanels>
                        <TabPanel>
                        </TabPanel>
                        <TabPanel>
                        </TabPanel>
                        <TabPanel>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Container>

            <div>
            </div>

            <Container>
                <SimpleGrid columns={3} spacing="400" rowGap={50} justifyItems="center" ml="-180px">
                    {rubricas.map((rubrica) => {
                        console.log("Criterios de la rúbrica:", rubrica.criterios);
                        return (
                            <RubricaCard
                                key={rubrica._id}
                                rubrica={rubrica}
                                onVerClick={handleVerClick}
                                onEditarClick={handleEditarClick}
                                onEliminarClick={handleEliminarClick} />
                        );
                    })}
                </SimpleGrid>
                <RubricaView
                    isOpen={isViewOpen}
                    onClose={() => setIsViewOpen(false)}
                    rubrica={selectedRubrica} />
            </Container>

            {isEditing && editingRubrica && (
                <RubricaEdit
                    isOpen={isEditing}
                    onClose={() => setIsEditing(false)}
                    rubrica={editingRubrica} />
            )}
        </div>
    );
};

export default Rubrica;