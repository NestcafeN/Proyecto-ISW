import Fondosmain from "../components/Fondosmain";
import Header from "../components/Header";
import React, { useState } from 'react';
import { deleteFondo } from '../services/fondo.service';

function FondosPage() {

  const handleEliminarClick = async (fondo) => {
    try {
        await deleteFondo(fondo._id);
        setFondos((prevFondos) => prevFondos.filter((r) => r._id !== fondo._id));
        console.log(`Fondo ${fondo.nombre} eliminado con éxito.`);
    } catch (error) {
        console.error(`Error al eliminar el fondo: ${error.message}`);
    }
};

  return (
    <> 
      <Header />
      <Fondosmain  onEliminarClick={handleEliminarClick} />
    </>
  );
}

export default FondosPage;
