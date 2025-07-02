import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '../styles/login.css';
import usersServices from '../services/usersServices';

function LoginForm() {

  const [ValueUser, setValueUser] = useState('');
  const [ValuePass, setValuePass] = useState('');
  
  let IDuser = 0;

  const navigate = useNavigate();

  async function FuntionActivarUser(id, objActivar, nuevaContra) {
    
    const ActivarUser = await usersServices.PutUserPatch(id, objActivar)

    const objCredentials = {
        username: ValueUser,
        password: nuevaContra,
    };

    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objCredentials)
    });

    const data = await response.json();

    if(ActivarUser && response) {
      Swal.fire({
        icon: "success",
        text: "La contraseña se ha cambiado éxitosamente.",
        background: "#1a1a1a",
        color: "#ffffff",
        showConfirmButton: false,
        showCancelButton: false,
        timer: 1500,
      });

      document.cookie = `access_token=${data.access}; path=/; secure; SameSite=Strict`;
      document.cookie = `refresh_token=${data.refresh}; path=/; secure; SameSite=Strict`;
      document.cookie = `user_id=${data.user_id}; path=/; secure; SameSite=Strict`;
      document.cookie = `role=${data.role}; path=/; secure; SameSite=Strict`;
   
      setTimeout(() => {
        navigate("/PrincipalPage")
      }, 1600);
    }
    

  }

  async function IniciarSesion() {

    if (!ValueUser || !ValuePass) {
      Swal.fire({
        icon: "info",
        text: "Por favor, ingresa tu usuario y contraseña.",
        background: "#1a1a1a", 
        color: "#ffffff",
        showConfirmButton: false,
        timer: 1500,
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

      IDuser = data.user_id;

      if (response.ok) {
        if (!data.is_active) {

          Swal.fire({
              icon: "info",
              title: "Digita tu nueva contraseña",
              confirmButtonColor: "#2ae2b6",
              background: "#1a1a1a",
              color: "#ffffff",
              confirmButtonText: "Aceptar",
              showCancelButton: true,
              cancelButtonText: "Cancelar",
              allowOutsideClick: false,
              allowEscapeKey: false,
              reverseButtons: true,
              html: `
                  <input id="swal-input1" class="swal2-input" placeholder="Nueva contraseña">
                  <input id="swal-input2" class="swal2-input" placeholder="Confirmar contraseña">
              `,
              focusConfirm: false,
              preConfirm: () => {
                  return [
                      document.getElementById('swal-input1').value,
                      document.getElementById('swal-input2').value
                  ];
              }
          }).then((result) => {
              if (!result.value[0] || !result.value[1]) {
                  Swal.fire({
                      icon: "error",
                      iconColor: "#2ae2b6",
                      text: "Digita la nueva contraseña.",
                      background: "#1a1a1a",
                      color: "#ffffff",
                      showCancelButton: false,
                      showConfirmButton: false,
                      timer: 1500,
                  });
              } else if (result.value[0].length < 8) {
                Swal.fire({
                    icon: "error",
                    iconColor: "#2ae2b6",
                    text: "La contraseña debe tener al menos 8 caracteres.",
                    confirmButtonColor: "#2ae2b6",
                    background: "#1a1a1a",
                    color: "#ffffff",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 1500,
                });
              } else if (result.value[0] !== result.value[1]) {
                  Swal.fire({
                      icon: "error",
                      iconColor: "#2ae2b6",
                      text: "Las contraseñas no coinciden. Por favor verifica e intenta nuevamente.",
                      confirmButtonColor: "#2ae2b6",
                      background: "#1a1a1a",
                      color: "#ffffff",
                      showCancelButton: false,
                      showConfirmButton: false,
                      timer: 1500,
                  });
              } else {

                  const obj = {
                    password: result.value[0],
                    is_active: true,
                  }
                  
                  FuntionActivarUser(IDuser, obj, result.value[0],)
              }
          });

        } else {
            document.cookie = `access_token=${data.access}; path=/; secure; SameSite=Strict`;
            document.cookie = `refresh_token=${data.refresh}; path=/; secure; SameSite=Strict`;
            document.cookie = `user_id=${data.user_id}; path=/; secure; SameSite=Strict`;
            document.cookie = `role=${data.role}; path=/; secure; SameSite=Strict`;
            navigate("/PrincipalPage");
        }

      } else {
          Swal.fire({
            icon: "error",
            text: "El usuario o contraseña son incorrectas. Intenta más tarde.",
            confirmButtonColor: "#2ae2b6",
            background: "#1a1a1a",
            color: "red",
            confirmButtonText: "Verificar",

          });
      }   
        
    }
  }
  
  function volver() {
    setTimeout(() => {
        navigate("/")       
    }, 200);

  }

  return (
    <div id='bodyLogin'>
      <div id='contLogin'>
        <header>

          <svg onClick={volver} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
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