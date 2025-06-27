
import usePersistentFingerprint from "./usePersistentFingerprint";

import {useState } from 'react';
import { useNavigate } from 'react-router-dom'
import PostMensajesCYS from "../services/EmailDjangoServices";
import Swal from "sweetalert2";

import '../styles/CYS.css'

function CYS() {

    const navigate = useNavigate();

    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Asunto, setAsunto] = useState('');
    const [Mensaje, setMensaje] = useState('');

    const fingerprintID = usePersistentFingerprint();

    const palabrasProhibidas = [
        "admin", "superuser", "password", "puta", "madre","pendejo", "mierda", "caca", "culo", "verga", "coño",
        "chingar", "pendeja", "puto", "cabrón", "cabron", "gilipollas", "maricón", "bollera", "zorra", "pene",  
        "putón", "pendejita", "pendejito","prostituta", "prostituto", "putas", "putos", "pendejos", "pendejas", 
        "cago", "cagó", "cagada", "cagado", "cagarse", "cagón", "cagones", "cagar", "cagando", "como", "vagina", 
        "putita", "meto", "cojo", "cojer"
    ];

    function exit() {
        setTimeout(() => {
            navigate('/')            
        }, 200);
    }
    
    
  async function EnviarMensaje() {
    ejecutarValidaciones()
  }

  const validarCampos = (Nombre, Apellido, Correo, Telefono, Asunto, Mensaje) => {
      if (![Nombre, Apellido, Correo, Telefono, Asunto, Mensaje].every(campo => campo.trim() !== "")) {
      Swal.fire({
          icon: "error",
          text: "Por favor, completa todos los campos.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonText: "Verificar",
      });
      return false;
      }
      return true;
  };

  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(correo)) {
        Swal.fire({
            icon: "error",
            text: "El correo electrónico no es válido, por favor verifica e intenta nuevamente.",
            confirmButtonColor: "#2ae2b6",
            background: "#1a1a1a",
            color: "#ffffff",
            confirmButtonText: "Verificar",
        });
        return false;
    }

    return true;
  };

  const validarTelefono = (Telefono) => {
    const prefijosCostaRica = [5, 8, 7, 6, 57, 21, 22, 24, 25, 26, 27];

    const validarTelefono = prefijosCostaRica.some(prefijo => Telefono.toString().startsWith(prefijo.toString()));
        
    const regex = /^[0-9]+$/;

    if (regex.test(Telefono) && Telefono.length >=8 && validarTelefono == true ) {
        return true
    }

    Swal.fire({
        icon: "error",
        text: "El número de telefono es invalido. Porfavor verifica e intenta nuevamente",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Verificar",
    });

  return false
  }
  
  const validarPalabrasProhibidas = (datos) => {
      if (palabrasProhibidas.some((palabra) => datos.some((dato) => dato.toLowerCase().includes(palabra)))) {
      Swal.fire({
          icon: "error",
          text: "Un campo contiene información no permitida, por favor verifica e intenta nuevamente.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonText: "Verificar",
      });
      return false;
      }
      return true;
  };

async function ejecutarValidaciones() {
  const datos = [Nombre, Apellido, Correo, Telefono, Asunto, Mensaje];

  if (
      validarCampos(Nombre, Apellido, Correo, Telefono, Asunto, Mensaje) &&
      validarCorreo(Correo) &&
      validarTelefono(Telefono) &&
      validarPalabrasProhibidas(datos)
  ) {

    const data = {
      nombre: Nombre,
      apellido: Apellido,
      correo: Correo,
      telefono: Telefono,
      asunto: Asunto,
      mensaje: Mensaje,
      fingerprint: fingerprintID,
    };
    
    const respuestaCYS = await PostMensajesCYS(data);

    if (respuestaCYS.status === 201) {
      Swal.fire({
          icon: "success",
          iconColor: "#2ae2b6",
          text: "Mensaje enviado con éxito.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          timer:2000,
          showConfirmButton: false,
      });
      setTimeout(() => {
        navigate("/")        
      }, 2100);

    } else if (respuestaCYS.status === 429) {

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
        navigate("/")        
      }, 2100);

    } else {

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
        navigate("/")        
      }, 2100);
    }

  }
}



  return (
    <div id='bodyCYS'>
        <header id='headerCYS'>
            <div>
          <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
          </svg><br /><br />
                <h2>Contacto y soporte</h2>
                <p>Por favor completa tu información </p>
            </div>
        </header>

        <main id='mainCYS'>
            <div id='subMainCYS'>
                <div id='form'>
                    <input value={Nombre} onChange={(e) => setNombre(e.target.value)} type="text" placeholder='Nombre'/>

                    <input value={Apellido} onChange={(e) => setApellido(e.target.value)} type="text" placeholder='Apellido' />

                    <input value={Correo} onChange={(e) => setCorreo(e.target.value)} type="text" placeholder='Correo electrónico' />

                    <input value={Telefono} onChange={(e) => setTelefono(e.target.value)} type="text" placeholder='Telefóno' />

                    <input value={Asunto} onChange={(e) => setAsunto(e.target.value)} type="text" placeholder='Asunto' />
                    
                    <textarea value={Mensaje} onChange={(e) => setMensaje(e.target.value)} rows={4} name="" id="" placeholder='Mensaje'></textarea>

                    <button onClick={EnviarMensaje} >Enviar</button>
                </div>

                <div id='IMG'>
                    <img src="/CYSIMG.svg" alt="" width={400} />
                </div>
            </div>

        </main>
        


    </div>
  )
}

export default CYS
