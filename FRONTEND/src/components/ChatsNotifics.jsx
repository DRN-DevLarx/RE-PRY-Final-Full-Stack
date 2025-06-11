import React, { useState } from 'react';
import '../styles/Chat.css';

const ChatNotifics = ({ nombre, onCerrar }) => {
  const [mensajes, setMensajes] = useState([
    { de: 'otro', texto: '¡Hola! ¿En qué puedo ayudarte?' },
    { de: 'yo', texto: `Hola ${nombre}, vi tu solicitud. ¿Tienes alguna pregunta?` }
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() === '') return;
    setMensajes([...mensajes, { de: 'yo', texto: nuevoMensaje }]);
    setNuevoMensaje('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enviarMensaje();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat con {nombre}</h3>
        <button onClick={onCerrar}>X</button>
      </div>
      <div className="chat-body">
        {mensajes.map((m, i) => (
          <div key={i} className={`mensaje ${m.de}`}>{m.texto}</div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatNotifics;

