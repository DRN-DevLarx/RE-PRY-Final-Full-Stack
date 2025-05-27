import React from 'react'
import  "../styles/Login.css";
import {Link, useNavigate } from 'react-router-dom';

function LoginForm() {


  const navigate = useNavigate()

  function exit() {
    setTimeout(() => {
        navigate('/')            
    }, 200);

  }

  return (
    <div id='bodyLogin'>
      <div id='contLogin'>
        <header>
          <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </header>
        <h1>Iniciar sesión</h1>

        <label htmlFor=""> <span>*</span> Ingresa el usuario o correo electronico</label><br />
        <input type="text" /><br /><br />

        <label htmlFor=""> <span>*</span> Contraseña</label><br />
        <input type="password" />

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