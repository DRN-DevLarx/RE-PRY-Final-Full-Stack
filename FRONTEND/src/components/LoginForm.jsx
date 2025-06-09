import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '../styles/login.css';
import authService from "../services/authServices"


function LoginForm() {

  const [ValueUser, setValueUser] = useState('');
  const [ValuePass, setValuePass] = useState('');

  const navigate = useNavigate();

  async function IniciarSesion() {

    if (!ValueUser || !ValuePass) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Por favor, ingresa tu usuario y contraseña.",
      });

    } else {

      const credentials = {
          username: ValueUser,
          password: ValuePass,
      };      

        const response = await fetch("http://127.0.0.1:8000/api/token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        });

        const data = await response.json();
                
        if (response.ok) {
          
            document.cookie = `access_token=${data.access}; path=/; secure; SameSite=Strict`;
            document.cookie = `refresh_token=${data.refresh}; path=/; secure; SameSite=Strict`;
            document.cookie = `user_id=${data.user_id}; path=/; secure; SameSite=Strict`;

<<<<<<< HEAD
            navigate("/PrincipalPage");
=======
            if(data.role == "empresa") {
              navigate("/PrincipalPage");
            }
>>>>>>> 317bd4c4878e9116680e0bfb1b9f6e07faf5c52d
      }
    }
  }
  
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

        <label htmlFor=""> <span>*</span> Usuario</label><br />
        <input value={ValueUser} onChange={(e) => setValueUser(e.target.value)} type="text" /><br /><br />

        <label htmlFor=""> <span>*</span> Contraseña</label><br />
        <input value={ValuePass} onChange={(e) => setValuePass(e.target.value)} type="password" />

        <p align="center"> <Link className='Restablecer' to="/restablecer"> ¿Olvidastes la contraseña?</Link></p>

        <div className='DIVbtnR'>
          <button onClick={IniciarSesion} className='btnLogin'>Iniciar sesión</button>
        </div>
        <br />  
        <p className='pRR' align="center">¿No tienes una cuenta?, <Link className='LINK' to="/registrarse"> Registrarse</Link></p>
      </div>
    </div>
  )
}

export default LoginForm