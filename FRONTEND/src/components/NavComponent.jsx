import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import BotonesAdmin from "./BotonesAdmin"
import { getCookie } from "../services/Token/sessionManager";
import Swal from 'sweetalert2'
import { jwtDecode } from "jwt-decode";
import {CerrarSesion, CerrarSesionPorSeguridad} from '../services/Token/sessionManager'
import { VerificarExpiracion } from '../services/Token/tokenUtils'
import { VerificarToken } from '../services/Token/fetchAuth';

import "../styles/NavPrincipal.css"

function NavComponent() {

  const [Users, setUsers] = useState([]);
  const accessToken = getCookie("access_token");

  const Rol = jwtDecode(accessToken).role;
  const [IsAdmin, setIsAdmin] = useState(false)
    
  async function BTNCerrarSesion() {
    
    Swal.fire({
      background: "#1a1a1a",
      icon: "question",
      iconColor: "#2ae2b6",
      title: "¿Deseas cerrar sesión?",
      color: "white",
      confirmButtonText: "Sí, salir",
      confirmButtonColor: "#2ae2b6",
      cancelButtonText: "No",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
          CerrarSesion();          
      }
    });
  }

  useEffect(() => {
      async function fetchUserData() {
                    
          if (!accessToken) {
              console.error("No se encontró el token de acceso");
              return;
          }

          if (Rol != "oferente") {
            setIsAdmin(true);
          }

          const response = await VerificarToken();
          if (response == false) {
            CerrarSesionPorSeguridad();
          } 
          else {
            setUsers(response);
          }


          // const response = await fetch(`http://127.0.0.1:8000/api/user-data/`, {
          //   method: "GET",
            
          //   headers: {
          //     "Content-Type": "application/json",
          //     "Authorization": `Bearer ${accessToken}`
          //     }
          //   });
            
          // if (!response.ok) {
          //     CerrarSesion();
          // } else {
          //   const userData = await response.json();
          //   setUsers(userData);
        
          // }
      }

      fetchUserData();
  }, []);
      
  return (
    <div id='contbodyadmin'>

      <div className='barra'>

        <div className='izquierda'>
          <img className="logo" src="../public/Iconlogo.png" alt="Logo" />
          <h2 id="tituloNav">Empleatico</h2>
        </div>


        {Users && (
        <div className='Bienvenida'>
          <h2>Bienvenido, {Users.username}</h2>
        </div>
        )}

        <div id="ContPerfil">
      
          <svg onClick={BTNCerrarSesion} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg>
        </div>
      </div>

      <div>
        {IsAdmin && (
            <BotonesAdmin/>
        )}
      </div>
    </div>
  )
}

export default NavComponent
