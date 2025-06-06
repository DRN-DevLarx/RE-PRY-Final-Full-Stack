import React, { useState, useRef, useEffect } from 'react';
import '../styles/PerfilUsuario.css';

const PerfilUsuario = ({ nombre, correo, telefono, identificacion, acercaDe, imagen }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  const alternarPerfil = () => setVisible(!visible);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="perfil-usuario-container" ref={ref}>
      <button className="perfil-btn" onClick={alternarPerfil}>

        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>
      </button>

      {visible && (
        <div className="panel-transparente">
          <div className="contenedor-blanco">
            <div className="perfil-contenido">
              <div className="foto-perfil">
                <img src={"LD.jpg"} alt="Foto de perfil" />
              </div>
              <div className="info-arriba">
                <p><strong>Correo:</strong> andresq43@gmail.com</p>
                <p><strong>Teléfono:</strong> 6473 8291</p>
                <p><strong>Identificación:</strong> 6 0432 0172</p>
              </div>
            </div>
            <div className="info-abajo">
              <p><strong>Nombre completo:</strong>Andrés Quijote Álvarez</p>
              <p><strong>Acerca de mí:</strong>Soy una persona que me gusta mejorar cada día</p>
            </div>
            <button className="btn-editar-perfil">Editar Perfil</button>
          </div>
          
        </div>
      )}
      
    </div>
  );
};

export default PerfilUsuario;





