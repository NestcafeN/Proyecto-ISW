import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';


const RubricaView = ({ isOpen, onClose, rubrica }) => {
    if (!rubrica) {
        return null;
    }

    const ViewStyles = {
        fontWeight: "600"
    }

    const criterios = rubrica && rubrica.criterios ? rubrica.criterios : [];

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }}>
                <ModalHeader>{rubrica.nombre}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text sx={ViewStyles}>Tipo de Fondo:</Text>
                    <Text>{rubrica.tipoFondo}</Text>
                    <Text sx={ViewStyles}>Criterios: </Text>
                    {rubrica.criterios && rubrica.criterios.map((criterio, index) => (
                        <Text key={criterio.id || index}>{criterio.nombre}</Text>
                    ))}
                    <Text sx={ViewStyles}>Puntaje Mínimo de Aprobación:</Text>
                    <Text>{rubrica.puntajeMinimoAprobacion}</Text>
                    <Text sx={ViewStyles}>Puntaje Máximo de Aprobación:</Text>
                    <Text>{rubrica.puntajeMaximoAprobacion}</Text>
                    <Text sx={ViewStyles}>Fecha de Creación: </Text>
                    <Text>{rubrica.fechaCreacion}</Text>
                    <Text sx={ViewStyles}>Fecha de Modificación:</Text>
                    <Text marginBottom="20px">{rubrica.fechaModificacion}</Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

RubricaView.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    rubrica: PropTypes.object,
};

export default RubricaView;