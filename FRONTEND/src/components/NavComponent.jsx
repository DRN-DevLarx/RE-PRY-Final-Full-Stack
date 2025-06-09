import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import "../styles/NavPrincipal.css"
import { useNavigate } from 'react-router-dom';

function NavComponent() {
<<<<<<< HEAD
    const navigate = useNavigate();

  function exitDashboard() {
    navigate("/PrincipalPage");
  }
=======

  const navigate = useNavigate()
  const [Users, setUsers] = useState([]);

  
  function CerrarSesion() {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login")
  }
  
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
  }
  
  
  useEffect(() => {
      async function fetchUserData() {
          const accessToken = getCookie("access_token");
                    
          if (!accessToken) {
              console.error("No se encontró el token de acceso");
              return;
          }

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/user-data/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                  
                if (!response.ok) {
                    throw new Error(`Error en la respuesta del servidor: ${response.status}`);
                } else {

                  const userData = await response.json();                  
                  setUsers(userData);
                  
                    
                }
  
  
            } catch (error) {
                console.error("Error en la solicitud:", error.message);
            }
        
      }

      fetchUserData();
  }, []);
  
  
>>>>>>> 317bd4c4878e9116680e0bfb1b9f6e07faf5c52d
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
      
<<<<<<< HEAD
          <svg onClick={exitDashboard} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
=======
          <svg onClick={CerrarSesion} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
>>>>>>> 317bd4c4878e9116680e0bfb1b9f6e07faf5c52d
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg>
        </div>
      </div>

      <div>

        {Users && (
          <article>
            <h3>Nombre: {Users.first_name}</h3>
            <h3>Email: {Users.email}</h3>
            {/* Otros campos */}
          </article>
        )
        }


      </div>
    </div>
  )
}

export default NavComponent
