import React from 'react'
import  "../styles/Login.css";
import {Link, useNavigate } from 'react-router-dom';

function LoginForm() {


  const navigate = useNavigate()

  function volver() {
    setTimeout(() => {
        navigate(-1)            
    }, 200);

  }

  return (
    <div id='bodyLogin'>
      <div id='contLogin'>
        <header>
          <svg onClick={volver} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
          </svg>
        </header>
        
        <h1>Iniciar sesión</h1>

        <label htmlFor=""> <span>*</span> Ingresa el usuario o correo electronico</label><br />
        <input type="text" /><br /><br />

        <label htmlFor=""> <span>*</span> Contraseña</label><br />
        <input type="password" />

        <p align="center"> <Link className='Restablecer' to="/restablecer"> ¿Olvidastes la contraseña?</Link></p>

        <div className='DIVbtnR'>
          <button className='btnLogin'>Iniciar sesión</button>
        </div>
        <br />  
        <p className='pRR' align="center">¿No tienes una cuenta?, <Link className='LINK' to="/register1"> Registrarse</Link></p>
      </div>
    </div>
  )
}

export default LoginForm