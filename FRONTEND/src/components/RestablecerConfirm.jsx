import React, { use } from 'react'
import "../styles/Restablecer.css";
import { useNavigate } from 'react-router-dom';


function Restablecer() {

  const navigate = useNavigate();

  function volver() {
    navigate(-1);
  }

  function RestablecerAceptar() {
    navigate('/restablecer/confirmar');
  }
  

  return (
    <div>
        <div id='bodyRestablecer'>
            <div id='contRestablecer'>
              <header>
                <svg onClick={volver} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                </svg>
              </header>

              <h1>Restablecer contraseña</h1>
      
              <label htmlFor=""> <span>*</span> Nueva contraseña</label>
              <input className='input' type="email" /><br /><br />
  
              <label htmlFor=""> <span>*</span> Confimar contraseña</label>
              <input className='input' type="email" /><br /><br />
             
              <div className='DIVbtnRestablecer'>
                  <button onClick={RestablecerAceptar} className='btnRestablecerSiguiente'>Aceptar </button>
              </div><br />
              

            </div>
        </div>
    </div>
  )
}

export default Restablecer
