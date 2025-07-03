import React, { useState, useEffect } from 'react'

import "../styles/Restablecer.css";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import usersServices from '../services/usersServices';
import EmailDjangoServices from "../services/EmailDjangoServices";


function Restablecer() {

  const [Users, setUsers] = useState([])

    useEffect(() => {
    const fetchData = async () => {
        try {

          const datosUsers = await usersServices.GetUser()          
                
          if (datosUsers) {
            setUsers(datosUsers);
          }

        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
      };

    fetchData();
      
  }, []);

  const navigate = useNavigate();
  
  // Digitado por el usuario
  const [Email, setEmail] = useState("")
  const [NomUsuario, setNomUsuario] = useState("")
  
  
  let username = "";
  let email = "";

  const usuario = Users.find((user) => user.email == Email && user.username == NomUsuario);
  
  if (usuario) {
    username = usuario.username;
    email = usuario.email;       
  }
  
  function volver() {
    navigate(-1);
  }


  function SolicitudCambio() {

    if(NomUsuario.trim() == "" || Email.trim() == "") {
      Swal.fire({
        icon: "error",
        text: "Rellena los campos primero.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        showConfirmButton: false,
        timer: 2000,
      })
    } else {
      if(!usuario) {
        Swal.fire({
          icon: "error",
          text: "EL usuario o correo electrónico no están registrados.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          showConfirmButton: false,
          timer: 2000,
        })
      }
  
      else {
        console.log("Pasa");
        Aserver()
      }
    }

    

    async function Aserver() {

      Swal.fire({
        allowOutsideClick: false,
        showConfirmButton: false,
        background: 'rgba(0,0,0,0.1)',
        backdrop: 'rgba(0,0,0,0.3)',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="swal2-spinner"></div>
            <p style="margin-top: 10px; font-size: 14px; color: #555;">Cargando...</p>
          </div>
        `,
        didOpen: () => {
          Swal.showLoading();
        }
      });


      const data = {
        correo: email,
        usuario: username,
      };
      
      try {
        const respuestaRestablecer = await EmailDjangoServices.ClaveTemporal(data);
          
        if (respuestaRestablecer.status === 200) {
          Swal.fire({
              icon: "success",
              iconColor: "#2ae2b6",
              text: "La contraseña temporal se ha enviado con éxito.",
              confirmButtonColor: "#2ae2b6",
              background: "#1a1a1a",
              color: "#ffffff",
              timer:2000,
              showConfirmButton: false,
          });
          setTimeout(() => {
            navigate("/login")        
          }, 2100);
  
        } else if (respuestaRestablecer.status === 429) {
  
          Swal.fire({
            icon: "warning",
            iconColor: "#DC143C",
            text: "Haz alcanzado el limíte de envíos por hoy. Intenta otro día.",
            confirmButtonColor: "#2ae2b6",
            background: "#1a1a1a",
            color: "#ffffff",
            timer:2000,
            showConfirmButton: false,
          });
  
          setTimeout(() => {
            navigate("/login")        
          }, 2100);
        }
        
      } catch (error) {
        Swal.fire({
          icon: "error",
          iconColor: "#2ae2b6",
          text: "Error inesperado. Intenta más tarde.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          timer:2000,
          showConfirmButton: false,
        });
  
        setTimeout(() => {
          navigate("/login")        
        }, 2100);
        
      }
   
    }
    
  }



  return (
    <div>
        <div id='bodyRestablecer'>
            <div id='contRestablecer'>

              <header>
                <svg onClick={volver} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                  <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                </svg>
              </header>

              <h2>Restablecer contraseña</h2>
      
              <label htmlFor=""> <span>*</span> Ingresa tu nombre de usuario</label>
              <input value={NomUsuario} onChange={(e) => setNomUsuario(e.target.value)} className='input2' type="text" /><br /><br />
      
              <label htmlFor=""> <span>*</span> Ingresa tu correo electrónico</label>
              <input value={Email} onChange={(e) => setEmail(e.target.value)} className='input2' type="email" /><br /><br />
      
              <div className='DIVbtnRestablecer'>
                  <button onClick={SolicitudCambio} className='btnRestablecerSolicitar'>Solicitar cambio de contraseña</button>
              </div><br />
              

            </div>
        </div>
    </div>
  )
}

export default Restablecer
