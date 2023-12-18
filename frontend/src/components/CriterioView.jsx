import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Box,
} from '@chakra-ui/react';

const CriterioView = ({ isOpen, onClose, criterio }) => {
    if (!criterio) {
        return null;
    }

    const ViewStyles = {
        fontWeight: "600"
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }}>
                <ModalHeader>{criterio.nombre}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text sx={ViewStyles}>Descripción:</Text>
                    <Text>{criterio.descripcion}</Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

CriterioView.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    criterio: PropTypes.object,
};

export default CriterioView;