import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/EditPerf.css';

const EditPerf = () => {
  return (
    <div className="editar-perfil-container">
      <div className="form-card">
        <button className="btn-cerrar">
          <i className="bi bi-x-lg"></i>
        </button>
        <h2 className="titulo">Editar Perfil</h2>
        <form className="form-grid">
          <input type="text" placeholder="Nombre" className="input nombre" />
          <input type="text" placeholder="Apellido" className="input apellido" />
          <input type="text" placeholder="Usuario" className="input usuario" />
          <input type="date" placeholder="Fecha de nacimiento" className="input fecha" />
          <div className="input-icon contraseña">
            <input type="password" placeholder="Contraseña" />
            <i className="bi bi-eye-slash-fill icono-ojo"></i>
          </div>
          <div className="input-icon confirmar">
            <input type="password" placeholder="Confirmar contraseña" />
            <i className="bi bi-eye-slash-fill icono-ojo"></i>
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



