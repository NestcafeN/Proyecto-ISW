import { getRubrica } from '../services/rubrica.service';
import { getCriterios } from '../services/criterio.service';
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
import RubricaCard from '../components/RubricaCard';
import RubricaView from '../components/RubricaView';
import styled from '@emotion/styled';
import EvaluarRubrica from '../components/EvaluarRubrica';

const EvaluacionPage = () => {
    const [rubricas, setRubricas] = useState([]);
    const [criterios, setCriterios] = useState([]);
    const [selectedCriterio, setSelectedCriterio] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEvaluarOpen, setIsEvaluarOpen] = useState(false);
    const [showEvaluarModal, setShowEvaluarModal] = useState(false);
    const [selectedRubrica, setSelectedRubrica] = useState(null);

    useEffect(() => {
        getRubrica().then(setRubricas).catch((error) => console.error("Error al obtener rubricas:", error));
        getCriterios().then(setCriterios).catch((error) => console.error("Error al obtener criterios:", error));
    }, []);

    useEffect(() => {
        if (!showEvaluarModal) {
            // Lógica adicional después de cerrar el modal
            // ...
        }
    }, [showEvaluarModal]);

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

    const handleVerClick = (rubrica) => {
        setSelectedRubrica(rubrica);
        setIsViewOpen(true);
    };

    const handleEvaluarClick = async (rubrica) => {
        setSelectedRubrica(rubrica);

        try {
            const rubricaCriterios = await getCriteriosByRubricaId(rubrica._id); // Asumiendo que hay una función para obtener los criterios por ID de rubrica
            setSelectedCriterios(rubricaCriterios);
        } catch (error) {
            console.error('Error al obtener los criterios de la rubrica:', error.message);
        }

        setShowEvaluarModal(true);
    };


    const handleEvaluarClose = () => {
        setIsEvaluarOpen(false);
        // Puedes realizar acciones adicionales después de cerrar el modal de evaluación
    };

    const handlePuntuacionCriterio = async (criterioId, puntaje) => {
        try {
            await updatePuntajeCriterio(criterioId, puntaje);
            console.log(`Puntaje del criterio ${criterioId} actualizado a ${puntaje}`);
        } catch (error) {
            console.error('Error al actualizar el puntaje del criterio:', error.message);
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
        <Container>
            <Box mt="5">
                <Heading fontSize="xl" fontWeight="500">Rubricas de Evaluación</Heading>
            </Box>
            <Tabs mt="5">
                <TabList>
                    <Tab>Rúbricas Sin Evaluar</Tab>
                    <Tab>Rúbricas Evaluadas</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {/* Rúbricas Sin Evaluar */}
                        {rubricas.map((rubrica) => (
                            <RubricaCard
                                key={rubrica._id}
                                rubrica={rubrica}
                                onVerClick={handleVerClick}
                                onEvaluarClick={() => handleEvaluarClick(rubrica)}  // Cambiado aquí
                            />
                        ))}
                    </TabPanel>
                    <TabPanel>
                        {/* Rúbricas Evaluadas */}
                        {rubricas.map((rubrica) => (
                            <RubricaCard
                                key={rubrica._id}
                                rubrica={rubrica}
                                onVerClick={handleVerClick}
                                onEvaluarClick={() => handleEvaluarClick(rubrica)}  // Cambiado aquí
                            />
                        ))}
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <RubricaView
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                rubrica={selectedRubrica}
            />

            {showEvaluarModal && (
                <EvaluarRubrica
                    isOpen={showEvaluarModal}
                    onClose={() => setShowEvaluarModal(false)}
                    rubrica={selectedRubrica}
                    criterios={selectedCriterios}
                    onPuntuacionCriterio={handlePuntuacionCriterio}
                />
            )}
        </Container>
    );
};

export default EvaluacionPage;