import { useNavigate } from 'react-router-dom';

import  "../styles/NavPrincipal.css";
import { useEffect, useState } from 'react';

function AdminComponent() {
  const navigate = useNavigate();




  const [userData, setUserData] = useState(null);

    useEffect(() => {
        function getCookie(name) {
            const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
                const [key, value] = cookie.split("=");
                acc[key] = value;
                return acc;
            }, {});
            return cookies[name];
        }

        const accessToken = getCookie("access_token");

        console.log("Access Token:", accessToken);

        fetch("http://127.0.0.1:8000/api/user-data/", {
            method: "GET",
            headers: { "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" },
            credentials: "include"
        }).then(response => response.json())
          .then(data => setUserData(data));
    }, []);

    
    function CerrarSesion() {
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login")
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
          <svg onClick={CerrarSesion} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg>
        </div>
      </div>


    </div>
  )
}

export default AdminComponent




