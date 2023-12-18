import { getRubrica, deleteRubrica } from '../services/rubrica.service';
import { getCriterios, deleteCriterio } from '../services/criterio.service';
import React, { useEffect, useState } from 'react';
import {
    Container,
    Heading,
    Box,
    Flex,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    Input,
    Tab,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    IconButton
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import RubricaCard from '../components/RubricaCard';
import RubricaCreate from '../components/RubricaCreate';
import RubricaView from '../components/RubricaView';
import RubricaEdit from '../components/RubricaEdit';
import CriterioCard from '../components/CriterioCard';
import CriterioCreate from '../components/CriterioCreate';
import CriterioView from '../components/CriterioView';
import CriterioEdit from '../components/CriterioEdit';
import styled from '@emotion/styled';


const Rubrica = () => {
    const [rubricas, setRubricas] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCreateCriterioModalOpen, setIsCreateCriterioModalOpen] = useState(false);
    const [selectedRubrica, setSelectedRubrica] = useState(null);
    const [criterios, setCriterios] = useState([]);
    const [selectedCriterio, setSelectedCriterio] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [editingRubrica, setEditingRubrica] = useState(null);
    const [editingCriterio, setEditingCriterio] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [criterioSearchTerm, setCriterioSearchTerm] = useState("");
    const [rubricaSearchTerm, setRubricaSearchTerm] = useState("");


    useEffect(() => {
        getRubrica()
            .then((response) => {
                if (Array.isArray(response)) {
                    setRubricas(response);
                    console.log(response);
                } else {
                    console.error("La respuesta de getRubrica() no es un array.");
                }
            })
            .catch((error) => console.error("Error al obtener rubricas:", error));

        getCriterios()
            .then((response) => {
                if (Array.isArray(response)) {
                    setCriterios(response);
                    console.log(response);
                } else {
                    console.error("La respuesta de getCriterios() no es un array.");
                }
            })
            .catch((error) => console.error("Error al obtener criterios:", error));
    }, []);

    useEffect(() => {
        setEditingCriterio(null);
        setEditingRubrica(null);
        setIsEditing(false);
    }, [currentTab]);

    const StyledTitleBox = styled(Box, {
        shouldForwardProp: (propName) => propName !== 'sx',
    })`
        p: 1px;
        bg: gray.500;
        color: black;
        m: 50px;
        text-align: center;
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    `;

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleOpenCreateCriterioModal = () => {
        setIsCreateCriterioModalOpen(true);
    };

    const handleCloseCreateCriterioModal = () => {
        setIsCreateCriterioModalOpen(false);
    };

    const handleVerClick = (rubrica, criterio) => {
        setSelectedRubrica(rubrica);
        setSelectedCriterio(criterio);
        setIsViewOpen(true);
    };

    const handleEditarClickRubrica = (rubrica) => {
        setEditingRubrica(rubrica);
        setIsEditing(true);
    };

    const handleEditarClick = (criterio) => {
        setEditingCriterio(criterio);
        setIsEditing(true);
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

    const handleEliminarCriterioClick = async (criterio) => {
        try {
            await deleteCriterio(criterio._id);
            setCriterios((prevCriterios) => prevCriterios.filter((c) => c._id !== criterio._id));
            console.log(`Criterio ${criterio.nombre} eliminado con éxito.`);
        } catch (error) {
            console.error(`Error al eliminar el criterio: ${error.message}`);
        }
    };

    return (
        <div>
            <Container>

                <StyledTitleBox>
                    <Heading my="10px" fontSize="xl" fontWeight="500">Rubricas de Evaluación</Heading>
                </StyledTitleBox>

                <Tabs mt="40px" p="10px" variant="enclosed">
                    <TabList>
                        <Tab onClick={() => setCurrentTab(0)} _selected={{ color: 'white', bg: 'blue.600' }}>Rúbricas Sin Evaluar</Tab>
                        <Tab onClick={() => setCurrentTab(1)} _selected={{ color: 'black', bg: 'blue.200' }}>Gestión de Criterios</Tab>
                        <Tab onClick={() => setCurrentTab(2)} _selected={{ color: 'white', bg: 'green.500' }}>Rúbricas Evaluadas</Tab>
                    </TabList>

                    <Flex justify="space-between" align="center" mb="1" mt="2">
                        {currentTab !== 1 && (
                            <>
                                <IconButton
                                    icon={<AddIcon />}
                                    aria-label="Crear nueva rúbrica"
                                    size="lg"
                                    onClick={handleOpenCreateModal}
                                />
                                <InputGroup>
                                    <Input
                                        type="text"
                                        placeholder="Buscar rúbrica..."
                                        value={rubricaSearchTerm}
                                        onChange={(e) => setRubricaSearchTerm(e.target.value)}
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            icon={<SearchIcon />}
                                            aria-label="Buscar rúbrica"
                                            size="sm"
                                        // Agrega la lógica para manejar la búsqueda de rúbricas
                                        />
                                    </InputRightElement>
                                </InputGroup>
                            </>
                        )}
                    </Flex>

                    {isCreateModalOpen && (
                        <RubricaCreate isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />
                    )}

                    <TabPanels>
                        <TabPanel>
                            {currentTab === 0 && ( // Asegúrate de mostrar solo cuando estás en el tab "Todas las Rúbricas"
                                <Container>
                                    <SimpleGrid columns={3} spacing="400" rowGap={50} justifyItems="center" ml="-180px">
                                        {rubricas.map((rubrica) => (
                                            <RubricaCard
                                                key={rubrica._id}
                                                rubrica={rubrica}
                                                onVerClick={handleVerClick}
                                                onEditarClick={handleEditarClickRubrica}
                                                onEliminarClick={handleEliminarClick}
                                            />
                                        ))}
                                    </SimpleGrid>
                                    <RubricaView
                                        isOpen={isViewOpen}
                                        onClose={() => setIsViewOpen(false)}
                                        rubrica={selectedRubrica}
                                    />
                                </Container>
                            )}

                            {isEditing && editingRubrica && (
                                <RubricaEdit
                                    isOpen={isEditing}
                                    onClose={() => setIsEditing(false)}
                                    rubrica={editingRubrica}
                                    isEditingRubrica={true}
                                />
                            )}
                        </TabPanel>

                        <TabPanel>
                            <Flex justify="space-between" align="center" mb="4">
                                <IconButton
                                    icon={<AddIcon />}
                                    aria-label="Crear nuevo criterio"
                                    size="lg"
                                    onClick={handleOpenCreateCriterioModal}
                                />
                                <InputGroup flex="1">
                                    <Input
                                        type="text"
                                        placeholder="Buscar criterio..."
                                        value={criterioSearchTerm}
                                        onChange={(e) => setCriterioSearchTerm(e.target.value)}
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            icon={<SearchIcon />}
                                            aria-label="Buscar criterio"
                                            size="sm"
                                        // Agrega la lógica para manejar la búsqueda de criterios
                                        />
                                    </InputRightElement>
                                </InputGroup>
                            </Flex>
                            {isCreateCriterioModalOpen && (
                                <CriterioCreate
                                    isOpen={isCreateCriterioModalOpen}
                                    onClose={handleCloseCreateCriterioModal}
                                />
                            )}

                            {currentTab === 1 && (
                                <Container>
                                    <SimpleGrid columns={3} spacing="400" rowGap={50} justifyItems="center" ml="-180px">
                                        {criterios.map((criterio) => (
                                            <CriterioCard
                                                key={criterio._id}
                                                criterio={criterio}
                                                onVerClick={handleVerClick}
                                                onEditarClick={() => handleEditarClick(criterio)}  // Pasa el criterio como argumento
                                                onEliminarClick={handleEliminarCriterioClick}
                                            />
                                        ))}
                                    </SimpleGrid>
                                    <CriterioView
                                        isOpen={isViewOpen}
                                        onClose={() => setIsViewOpen(false)}
                                        rubrica={selectedCriterio}
                                    />

                                    {isEditing && editingCriterio && (
                                        <CriterioEdit
                                            isOpen={isEditing}
                                            onClose={() => setIsEditing(false)}
                                            criterio={editingCriterio}
                                        />
                                    )}
                                </Container>
                            )}
                        </TabPanel>

                        <TabPanel>
                            <Container>
                                <SimpleGrid columns={3} spacing="400" rowGap={50} justifyItems="center" ml="-180px">
                                    {rubricas.map((rubrica) => {
                                        return (
                                            <RubricaCard
                                                key={rubrica._id}
                                                rubrica={rubrica}
                                                onVerClick={handleVerClick}
                                                onEditarClick={handleEditarClickRubrica}
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
                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </Container>

        </div>
    );
};

export default Rubrica;