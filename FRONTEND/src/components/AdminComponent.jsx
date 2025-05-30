import React from 'react';
import { useNavigate } from 'react-router-dom';

import  "../styles/admin.css";

function AdminComponent() {
  const navigate = useNavigate();

  function IrDashboar() {
      navigate("/dashboard");
  }

  function IrPublicar() {
      navigate("/public");
  }
  
  return (
    <div id='contbodyadmin'>

      <div className='barra'>
        <div className='izquierda'>
          <img className="logo" src="../public/Iconlogo.png" alt="Logo" />
          <h2 id="tituloNav">Empleatico</h2>
        </div>

        <div className='busq'>
          <input type="text" placeholder="Buscar empleo" className="searchBar" />
        </div>

        <div id="ContPerfil">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-bell-fill" viewBox="0 0 16 16">
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
      </svg>


          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="white" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
        </div>
      </div>

      <div>
        <div className="contBtnsActiones">
          <button onClick={IrDashboar}> Administrar </button>
          <button onClick={IrPublicar}> Publicar </button>
        </div>
      </div>

    </div>
  )
}

export default AdminComponent




