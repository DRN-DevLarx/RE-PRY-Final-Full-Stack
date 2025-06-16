// ChatsNotifics

import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ChatNotific.css';
import { useLocation } from 'react-router-dom';

const users = [
  { name: 'Juan Andrés Ruiz Venegas', id: 2 },
  { name: 'Andrea Quesada Ordoñez', id: 1 },
  { name: 'Gimena Suares Montero', id: 3 }, // Ten cuidado con ids duplicados, aquí uno para ejemplo
];

const ChatNotific = () => {
  const location = useLocation();
  // Extraemos id, nombre y mensaje si vienen por navigate de Notificaciones
  const { id, nombre, mensaje } = location.state || {};

  const [activeChat, setActiveChat] = useState(id || null);
  const [input, setInput] = useState('');
  const [allMessages, setAllMessages] = useState({});

  // Al cargar, si viene un mensaje inicial desde notificaciones, lo agregamos
  useEffect(() => {
    if (id && mensaje) {
      setAllMessages((prev) => {
        const userMsgs = prev[id] || [];
        // Verificamos que no se repita el mensaje inicial
        const existe = userMsgs.some((msg) => msg.text === mensaje && msg.from !== 'yo');
        if (existe) return prev;

        const newMsg = {
          id: Date.now(),
          from: 'otro',
          text: mensaje,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'enviado',
        };
        return {
          ...prev,
          [id]: [...userMsgs, newMsg],
        };
      });
    }
  }, [id, mensaje]);

  const handleSend = () => {
    if (!input.trim() || activeChat === null) return;
    const newMessage = {
      id: Date.now(),
      from: 'yo',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'enviado',
    };

    setAllMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage],
    }));
    setInput('');
  };

  // Marcar como leído todos los mensajes del otro usuario al abrir el chat
  useEffect(() => {
    if (activeChat !== null) {
      setAllMessages((prev) => {
        const updated = { ...prev };
        if (updated[activeChat]) {
          updated[activeChat] = updated[activeChat].map((msg) =>
            msg.from !== 'yo' ? { ...msg, status: 'leído' } : msg
          );
        }
        return updated;
      });
    }
  }, [activeChat]);

  const currentMessages = allMessages[activeChat] || [];

  return (
    <div className="chat-wrapper">
      <div className="sidebar">
        <div className="search-bar">
          <input type="text" placeholder="Buscar un chat o iniciar uno nuevo" />
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-item ${activeChat === user.id ? 'active' : ''}`}
            onClick={() => setActiveChat(user.id)}
          >
            <div className="user-icon"></div>
            <span>{user.name}</span>
          </div>
        ))}
      </div>

      <div className="chat-main">
        {activeChat ? (
          <>
            <div className="chat-header">
              <span>{users.find((u) => u.id === activeChat)?.name || 'Chat'}</span>
            </div>
            <div className="chat-messages">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.from === 'yo' ? 'sent' : 'received'}`}
                >
                  {msg.from !== 'yo' && (
                    <div className="message-header">
                      <div className="avatar-small"></div>
                      <span className="sender-name">
                        {users.find((u) => u.id === activeChat)?.name}
                      </span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                  <div className="timestamp">
                    <span>{msg.time}</span>
                    {msg.from === 'yo' && (
                      <i
                        className={`bi ${
                          msg.status === 'leído' ? 'bi-check2-all text-primary' : 'bi-check'
                        } check-icon`}
                      ></i>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <button className="plus-button">
                <i className="bi bi-plus-lg"></i>
              </button>
              <input
                type="text"
                placeholder="Escribe un mensaje"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="send-button" onClick={handleSend}>
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </>
        ) : (
          <div className="chat-placeholder">
            <i className="bi bi-chat-dots display-icon"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatNotific;
