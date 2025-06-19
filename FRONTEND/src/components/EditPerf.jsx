import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/EditPerf.css';

const EditPerf = () => {
  const navigate = useNavigate();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleCerrar = () => {
    navigate('/PrincipalPage');
  };

  return (
    <div className="editar-perfil-container">
      <div className="form-card">
        <button className="btn-cerrar" onClick={handleCerrar}>
          <i className="bi bi-x-lg"></i>
        </button>
        <h2 className="titulo">Editar Perfil</h2>
        <form className="form-grid">
          <input type="text" placeholder="Nombre" className="input nombre"  />
          <input type="text" placeholder="Apellido" className="input apellido"  />
          <input type="text" placeholder="Usuario" className="input usuario"   />
          <input type="tel" placeholder="Telefono" className="input tel"    />
          
          <div className="input-icon contraseña">
            <input
              type={mostrarContrasena ? 'text' : 'password'}
              placeholder="Contraseña"
              autoComplete="new-password"
            />
            <i
              className={`bi ${mostrarContrasena ? 'bi-eye-fill' : 'bi-eye-slash-fill'} icono-ojo`}
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
            ></i>
          </div>

          <div className="input-icon confirmar">
            <input
              type={mostrarConfirmacion ? 'text' : 'password'}
              placeholder="Confirmar contraseña"
              autoComplete="new-password"
            />
            <i
              className={`bi ${mostrarConfirmacion ? 'bi-eye-fill' : 'bi-eye-slash-fill'} icono-ojo`}
              onClick={() => setMostrarConfirmacion(!mostrarConfirmacion)}
            ></i>
          </div>

          <input type="email" placeholder="Correo electrónico" className="input correo" />
          <textarea placeholder="Acerca de mí.." className="textarea"></textarea>
          <button type="submit" className="btn-actualizar">Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default EditPerf;



