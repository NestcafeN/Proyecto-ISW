import { useState, useCallback } from "react";
import VentanaDeFondos from "../components/VentanaDeFondos";
import PortalPopup from "../components/PortalPopup";
import NavMenuContainer from "../components/NavMenuContainer";
import NavSearch from "../components/NavSearch";
import styles from "../components/FondosPage.module.css";

const FondosPage = () => {
  const [isVentanaDeFondosOpen, setVentanaDeFondosOpen] = useState(false);
  const [isVentanaDeFondos1Open, setVentanaDeFondos1Open] = useState(false);
  const [isVentanaDeFondos2Open, setVentanaDeFondos2Open] = useState(false);
  const [isVentanaDeFondos3Open, setVentanaDeFondos3Open] = useState(false);

  const onNavFondosClick = useCallback(() => {
    // Please sync "Pagina de Creacion de Fondos" to the project
  }, []);

  const onNavConcursosClick = useCallback(() => {
    // Please sync "Pagina de Creacion de Concursos" to the project
  }, []);

  const openVentanaDeFondos = useCallback(() => {
    setVentanaDeFondosOpen(true);
  }, []);

  const closeVentanaDeFondos = useCallback(() => {
    setVentanaDeFondosOpen(false);
  }, []);

  const openVentanaDeFondos1 = useCallback(() => {
    setVentanaDeFondos1Open(true);
  }, []);

  const closeVentanaDeFondos1 = useCallback(() => {
    setVentanaDeFondos1Open(false);
  }, []);

  const openVentanaDeFondos2 = useCallback(() => {
    setVentanaDeFondos2Open(true);
  }, []);

  const closeVentanaDeFondos2 = useCallback(() => {
    setVentanaDeFondos2Open(false);
  }, []);

  const openVentanaDeFondos3 = useCallback(() => {
    setVentanaDeFondos3Open(true);
  }, []);

  const closeVentanaDeFondos3 = useCallback(() => {
    setVentanaDeFondos3Open(false);
  }, []);

  return (
    <>
      <div className={styles.paginaDeFondos}>
        <div className={styles.fondo4}>
          <div className={styles.fondo4Child} />
          <div className={styles.fondo41}>Fondo 4</div>
          <div className={styles.descripcion}>descripcion</div>
          <div className={styles.fechaInicio15}>Fecha Inicio: 15 -11-2023</div>
          <div className={styles.fechaFin15012024}>Fecha Fin 15-01-2024</div>
          <div className={styles.montos}>Montos:</div>
          <div className={styles.abierto}>Abierto</div>
          <div className={styles.verDetalles} onClick={openVentanaDeFondos}>
            Ver detalles
          </div>
          <div className={styles.categoria}>Categoria</div>
        </div>
        <div className={styles.fondo3}>
          <div className={styles.fondo3Child} />
          <div className={styles.fondo31}>Fondo 3</div>
          <div className={styles.descripcion1}>descripcion</div>
          <div className={styles.fechaInicio151}>Fecha Inicio: 15 -11-2023</div>
          <div className={styles.fechaFin150120241}>Fecha Fin 15-01-2024</div>
          <div className={styles.montos1}>Montos:</div>
          <div className={styles.abierto1}>Abierto</div>
          <div className={styles.verDetalles1} onClick={openVentanaDeFondos1}>
            Ver detalles
          </div>
          <div className={styles.categoria1}>Categoria</div>
        </div>
        <div className={styles.fondo2}>
          <div className={styles.fondo2Child} />
          <div className={styles.fondo21}>Fondo 2</div>
          <div className={styles.descripcion2}>descripcion</div>
          <div className={styles.fechaInicio152}>Fecha Inicio: 15 -11-2023</div>
          <div className={styles.fechaFin150120242}>Fecha Fin 15-01-2024</div>
          <div className={styles.montos2}>Montos:</div>
          <div className={styles.abierto2}>Abierto</div>
          <div className={styles.verDetalles2} onClick={openVentanaDeFondos2}>
            Ver detalles
          </div>
          <div className={styles.categoria2}>Categoria</div>
        </div>
        <div className={styles.fondo1}>
          <div className={styles.fondo3Child} />
          <div className={styles.descripcion3}>descripcion</div>
          <div className={styles.fechaInicio153}>Fecha Inicio: 15 -11-2023</div>
          <div className={styles.fechaFin150120243}>Fecha Fin 15-01-2024</div>
          <div className={styles.montos3}>Montos:</div>
          <div className={styles.abierto1}>Abierto</div>
          <div className={styles.verDetalles3} onClick={openVentanaDeFondos3}>
            Ver detalles
          </div>
          <div className={styles.fondo11}>Fondo 1</div>
          <div className={styles.categoria3}>Categoria</div>
        </div>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <div className={styles.tituloDePagina}>
            <div className={styles.fondos}>Fondos</div>
          </div>
        </div>
        <NavMenuContainer />
        <NavSearch />
      </div>
      {isVentanaDeFondosOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeVentanaDeFondos}
        >
          <VentanaDeFondos onClose={closeVentanaDeFondos} />
        </PortalPopup>
      )}
      {isVentanaDeFondos1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeVentanaDeFondos1}
        >
          <VentanaDeFondos onClose={closeVentanaDeFondos1} />
        </PortalPopup>
      )}
      {isVentanaDeFondos2Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeVentanaDeFondos2}
        >
          <VentanaDeFondos onClose={closeVentanaDeFondos2} />
        </PortalPopup>
      )}
      {isVentanaDeFondos3Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeVentanaDeFondos3}
        >
          <VentanaDeFondos onClose={closeVentanaDeFondos3} />
        </PortalPopup>
      )}
    </>
  );
};

export default FondosPage;
