import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RubricaCard from '../components/RubricaCard';
import { getRubrica, updateRubrica } from '../services/rubrica.service';

const EvaluacionPage = () => {
    const navigate = useNavigate();
    const [rubrica, setRubrica] = useState({});
    const [puntajes, setPuntajes] = useState({});
    const [evaluacionEnviada, setEvaluacionEnviada] = useState(false);

    useEffect(() => {
        const obtenerRubrica = async () => {
            try {
                const rubricaObtenida = await getRubrica();
                // Verificamos que rubricaObtenida sea un objeto
                setRubrica(
                    rubricaObtenida && typeof rubricaObtenida === 'object'
                        ? rubricaObtenida
                        : {}  // Si no es un objeto, asignamos un objeto vacío
                );
            } catch (error) {
                console.error('Error al obtener la rúbrica', error);
            }
        };

        obtenerRubrica();
    }, []);


    const manejarCambioPuntaje = (criterioId, nuevoPuntaje) => {
        setPuntajes((prevPuntajes) => ({
            ...prevPuntajes,
            [criterioId]: nuevoPuntaje,
        }));
    };

    const enviarEvaluacion = async () => {
        try {
            await updateRubrica(rubrica.id, { puntajes });
            setEvaluacionEnviada(true);
        } catch (error) {
            console.error('Error al enviar la evaluación', error);
        }
    };

    const volverAInicio = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Página de Evaluación</h1>
            <RubricaCard
                rubrica={rubrica}
                onCambioPuntaje={manejarCambioPuntaje}
                onVerClick={() => { }}
                onEditarClick={() => { }}
                onEliminarClick={() => { }}
            />
            <button onClick={enviarEvaluacion} disabled={evaluacionEnviada}>
                {evaluacionEnviada ? 'Evaluación Enviada' : 'Enviar Evaluación'}
            </button>
            <button onClick={volverAInicio}>Volver a Inicio</button>
        </div>
    );
};

export default EvaluacionPage;
