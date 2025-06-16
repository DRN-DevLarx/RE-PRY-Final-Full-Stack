import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
<<<<<<< HEAD
import '../styles/ChatNotific.css';
import { useLocation } from 'react-router-dom';

// Lista de personas con las que se puede chatear
const personas = [
  { nombre: 'Juan Andrés Ruiz Venegas', id: 2 },
  { nombre: 'Andrea Quesada Ordoñez', id: 1 },
  { nombre: 'Gimena Suares Montero', id: 3 },
];
const ChatNotific = () => {
  const ubicacion = useLocation();
  // Si venimos de notificaciones, obtenemos estos datos
  const { id, nombre, mensaje } = ubicacion.state || {};
  const [chatActivo, setChatActivo] = useState(id || null);
  const [mensajeEscrito, setMensajeEscrito] = useState('');
  const [mensajesPorPersona, setMensajesPorPersona] = useState({});
  
  // Si llegó un mensaje desde otra pantalla (como notificaciones), lo agregamos


  useEffect(() => {
    if (id && mensaje) {
      setMensajesPorPersona((anterior) => {
        const mensajesUsuario = anterior[id] || [];
        const yaExiste = mensajesUsuario.some(
          (m) => m.texto === mensaje && m.enviadoPor !== 'yo'
        );
        if (yaExiste) return anterior;
        const nuevoMensaje = {
          id: Date.now(),
          enviadoPor: 'otra_persona',
          texto: mensaje,
          hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          estado: 'enviado',
        };
        return {
          ...anterior,
          [id]: [...mensajesUsuario, nuevoMensaje],
        };
      });
    }
  }, [id, mensaje]);


  const enviarMensaje = () => {
    if (!mensajeEscrito.trim() || chatActivo === null) return;
=======
import './ChatNotific.css';
import { useLocation } from 'react-router-dom';

// Lista de personas con las que se puede chatear
const personas = [
  { nombre: 'Juan Andrés Ruiz Venegas', id: 2 },
  { nombre: 'Andrea Quesada Ordoñez', id: 1 },
  { nombre: 'Gimena Suares Montero', id: 3 },
];

const ChatNotific = () => {
  const ubicacion = useLocation();

  // Si venimos de notificaciones, obtenemos estos datos
  const { id, nombre, mensaje } = ubicacion.state || {};

  const [chatActivo, setChatActivo] = useState(id || null);
  const [mensajeEscrito, setMensajeEscrito] = useState('');
  const [mensajesPorPersona, setMensajesPorPersona] = useState({});

  // Si llegó un mensaje desde otra pantalla (como notificaciones), lo agregamos
  useEffect(() => {
    if (id && mensaje) {
      setMensajesPorPersona((anterior) => {
        const mensajesUsuario = anterior[id] || [];
        const yaExiste = mensajesUsuario.some(
          (m) => m.texto === mensaje && m.enviadoPor !== 'yo'
        );
        if (yaExiste) return anterior;

        const nuevoMensaje = {
          id: Date.now(),
          enviadoPor: 'otra_persona',
          texto: mensaje,
          hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          estado: 'enviado',
        };

        return {
          ...anterior,
          [id]: [...mensajesUsuario, nuevoMensaje],
        };
      });
    }
  }, [id, mensaje]);

  const enviarMensaje = () => {
    if (!mensajeEscrito.trim() || chatActivo === null) return;

>>>>>>> 0b3f1ac29d2830c099d4ac8bb3fc7dfa0de6589c
    const nuevo = {
      id: Date.now(),
      enviadoPor: 'yo',
      texto: mensajeEscrito,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estado: 'enviado',
    };
<<<<<<< HEAD
=======

>>>>>>> 0b3f1ac29d2830c099d4ac8bb3fc7dfa0de6589c
    setMensajesPorPersona((anterior) => ({
      ...anterior,
      [chatActivo]: [...(anterior[chatActivo] || []), nuevo],
    }));
<<<<<<< HEAD
    setMensajeEscrito('');
  };


=======

    setMensajeEscrito('');
  };

>>>>>>> 0b3f1ac29d2830c099d4ac8bb3fc7dfa0de6589c
  // Cuando abro un chat, se marcan como "leído" los mensajes que me mandaron
  useEffect(() => {
    if (chatActivo !== null) {
      setMensajesPorPersona((anterior) => {
        const copia = { ...anterior };
        if (copia[chatActivo]) {
          copia[chatActivo] = copia[chatActivo].map((m) =>
            m.enviadoPor !== 'yo' ? { ...m, estado: 'leído' } : m
          );
        }
        return copia;
      });
    }
  }, [chatActivo]);
<<<<<<< HEAD
=======

  const mensajesActuales = mensajesPorPersona[chatActivo] || [];
>>>>>>> 0b3f1ac29d2830c099d4ac8bb3fc7dfa0de6589c

  const mensajesActuales = mensajesPorPersona[chatActivo] || [];
  
  return (
    <div className="chat-contenedor">
      <div className="barra-lateral">
        <div className="buscar-chat">
          <input type="text" placeholder="Buscar o iniciar un chat" />
        </div>
<<<<<<< HEAD

        {personas.map((persona) => (
          <div
            key={persona.id} className={`item-usuario ${chatActivo === persona.id ? 'activo' : ''}`}onClick={() => setChatActivo(persona.id)}>
            
            <div className="icono-usuario">Hola</div>
=======
        {personas.map((persona) => (
          <div
            key={persona.id}
            className={`item-usuario ${chatActivo === persona.id ? 'activo' : ''}`}
            onClick={() => setChatActivo(persona.id)}
          >
            <div className="icono-usuario"></div>
>>>>>>> 0b3f1ac29d2830c099d4ac8bb3fc7dfa0de6589c
            <span>{persona.nombre}</span>
          </div>
        ))}
      </div>

<<<<<<< HEAD

=======
>>>>>>> 0b3f1ac29d2830c099d4ac8bb3fc7dfa0de6589c
      <div className="area-chat">
        {chatActivo ? (
          <>
            <div className="encabezado-chat">
              <span>{personas.find((p) => p.id === chatActivo)?.nombre || 'Chat'}</span>
            </div>
            <div className="mensajes-chat">
              {mensajesActuales.map((m) => (
                <div
                  key={m.id}
                  className={`mensaje ${m.enviadoPor === 'yo' ? 'enviado' : 'recibido'}`}
                >
                  {m.enviadoPor !== 'yo' && (
                    <div className="encabezado-mensaje">
                      <div className="avatar-pequeño"></div>
                      <span className="nombre-remitente">
                        {personas.find((p) => p.id === chatActivo)?.nombre}
                      </span>
                    </div>
                  )}
                  <p>{m.texto}</p>
                  <div className="hora-mensaje">
                    <span>{m.hora}</span>
                    {m.enviadoPor === 'yo' && (
                      <i
                        className={`bi ${
                          m.estado === 'leído'
                            ? 'bi-check2-all text-primary'
                            : 'bi-check'
                        } icono-check`}
                      ></i>
                    )}
                  </div>
                </div>
              ))}
<<<<<<< HEAD
              
            </div>
            <div className="entrada-mensaje">
              <button className="boton-mas">
                {/* <i className="bi bi-plus-lg"></i> */}
=======
            </div>
            <div className="entrada-mensaje">
              <button className="boton-mas">
                <i className="bi bi-plus-lg"></i>
>>>>>>> 0b3f1ac29d2830c099d4ac8bb3fc7dfa0de6589c
              </button>
              <input
                type="text"
                placeholder="Escribe tu mensaje"
                value={mensajeEscrito}
                onChange={(e) => setMensajeEscrito(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
              />
              <button className="boton-enviar" onClick={enviarMensaje}>
<<<<<<< HEAD
                {/* <i className="bi bi-send-fill"></i> */}
=======
                <i className="bi bi-send-fill"></i>
>>>>>>> 0b3f1ac29d2830c099d4ac8bb3fc7dfa0de6589c
              </button>
            </div>
          </>
        ) : (
          <div className="esperando-chat">
<<<<<<< HEAD
            {/* <i className="bi bi-chat-dots icono-grande"></i> */}
=======
            <i className="bi bi-chat-dots icono-grande"></i>
>>>>>>> 0b3f1ac29d2830c099d4ac8bb3fc7dfa0de6589c
          </div>
        )}
      </div>
    </div>
  );
};
<<<<<<< HEAD
export default ChatNotific;
=======

export default ChatNotific;
>>>>>>> 0b3f1ac29d2830c099d4ac8bb3fc7dfa0de6589c
