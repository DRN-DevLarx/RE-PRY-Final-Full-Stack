import React, { useState, useRef, useEffect } from 'react';
import '../styles/Notificaciones.css';
import { useNavigate } from 'react-router-dom';

const Notificaciones = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  // Notificaciones con nombre, mensaje y un id único para cada usuario (importante para chat)
  const notificaciones = [
    {
      id: 1,
      nombre: 'Andrea Quesada Ordoñez',
      mensaje: 'He solicitado aplicar para el trabajo',
      noVisto: true,
    },
    {
      id: 2,
      nombre: 'Juan Andrés Ruiz Venegas',
      mensaje: 'Quiero aplicar para el empleo',
      noVisto: false,
    },
    {
      id: 3,
      nombre: 'Gimena Suares Montero',
      mensaje: 'He mandado mi currículum a este puesto He mandado mi currículum a este puestoHe mandado mi currículum a este puestoHe mandado mi currículum a este puestoHe mandado mi currículum a este puestoHe mandado mi currículum a este puestoHe mandado mi currículum a este puestoHe mandado mi currículum a este puesto',
      noVisto: false,
    },
  ];

  const alternarNotificaciones = () => setVisible(!visible);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navega al chat enviando id, nombre y mensaje por state
  const irAlChat = (notificacion) => {
    navigate('/chat', { state: { id: notificacion.id, nombre: notificacion.nombre, mensaje: notificacion.mensaje } });
  };

  return (
    <div className="notificaciones-container" ref={ref}>
      <button className="campana-btn" onClick={alternarNotificaciones} aria-label="Abrir notificaciones">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-bell-fill" viewBox="0 0 16 16">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
        </svg>
      </button>

      {visible && (
        <div className="barra-notificaciones">
          <h3>Notificaciones</h3>
          {notificaciones.map((n) => (
            <div
              key={n.id}
              className="notificacion-item"
              onClick={() => irAlChat(n)}
              style={{ cursor: 'pointer' }}
            >
              <strong>{n.nombre}</strong>
              <p>{n.mensaje}</p>
              {n.noVisto && <span className="punto-verde"></span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notificaciones;
