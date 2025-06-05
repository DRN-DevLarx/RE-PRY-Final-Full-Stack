import { useState, useEffect } from "react";
import  "../styles/RegisterEmpresas.css";
import { Await, Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import UsersServices from "../services/usersServices";
import InteresesServices from '../services/interesesServices';
<<<<<<< HEAD
import empresasServices from "../services/empresasServices";


// import InteUsuariosServices from "../services/interesesUsuariosServices";
// import Users_UsuariosServices from "../services/Users_UsuariosServices";
// import User_groupsServices from "../services/User_groupsServices";
=======
>>>>>>> 911c5ce22dfb8afff8b0b515c9c46b666c41cb52


function RegisterForm2() {

  const [Identificacion, setIdentificacion] = useState('');
  const [ConfirmacionID, setConfirmacionID] = useState('');
  const navigate = useNavigate();


  const [Empresas, setEmpresas] = useState([]);
  const [ErrorEmpresas, setErrorEmpresas] = useState(null);

  const [Usuarios, setUsuarios] = useState([]);
  const [ErrorUsuarios, setErrorUsuarios] = useState(null);

  const [Intereses, setIntereses] = useState([]);
  const [ErrorIntereses, setErrorIntereses] = useState(null);


  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Usuario, setUsuario] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [Confirm_Contraseña, setConfirm_Contraseña] = useState("");



  function volver() {
    setTimeout(() => {
        navigate("/")            
    }, 200);
  }
  
  function ROferente() {
    navigate('/register1')
  }

  function REmpresa () {
    navigate('/registrarEmpresa')
  }


  


  const simbolosNoPermitidos = [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]",
    "{", "}", ":", ";", "'", '"', "<", ">", "/", "\\", "|", "=", "+"
  ];

  const dominiosCR = [
    // Proveedores de correo globales
    "@gmail.com",
    "@outlook.com",
    "@yahoo.com",
    "@hotmail.com",
    "@icloud.com",
    "@aol.com",
    "@live.com",
    "@protonmail.com",
    "@zoho.com",
    "@mail.com",
    "@tutanota.com",
    "@gmx.com",
    "@yandex.com",

    // Dominios específicos de Costa Rica
    "@crmail.com",
    "@nic.cr",
    "@co.cr",
    "@ac.cr",
    "@go.cr",
    "@or.cr",

    // Empresas costarricenses y multinacionales con presencia en CR
    "@bancopopular.fi.cr",
    "@baccredomatic.cr",
    "@scotiabankcr.com",
    "@bncr.fi.cr",
    "@ice.go.cr",
    "@gruponacion.com",
    "@telecablecr.com",
    "@kolbi.cr",
    "@racsa.go.cr",
    "@universidadcr.ac.cr",
    "@movistar.cr",
    "@claro.cr",
    "@tigo.cr",

    // Multinacionales y empresas con operaciones en Costa Rica
    "@dhl.com",
    "@amazon.com",
    "@intel.com",
    "@cargill.com",
    "@procterandgamble.com",
    "@bayer.com",
    "@pfizer.com",
    "@coca-cola.com",
    "@nestle.com",
    "@unilever.com",
    "@walmart.com",

    // Otros dominios relacionados con Costa Rica
    "@costarica.com",
    "@puravida.com"
  ];

  const palabrasProhibidas = [
    "admin", "superuser", "password", "puta", "madre","pendejo", "mierda", "caca", "culo", "verga", "coño",
    "chingar", "pendeja", "puto", "cabrón", "cabron", "gilipollas", "maricón", "bollera", "zorra", "pene",  
    "putón", "pendejita", "pendejito","prostituta", "prostituto", "putas", "putos", "pendejos", "pendejas", 
    "cago", "cagó", "cagada", "cagado", "cagarse", "cagón", "cagones", "cagar", "cagando", "como", "vagina", 
    "putita", "meto", "cojo", "cojer"];


  useEffect(() => {
      let isMounted = true; 
      const fetch = async () => {
          try {
              const DatosIntereses = await InteresesServices.GetIntereses();
              const DatosUsuarios = await UsersServices.GetUser();
              const DatosEmpresas = await empresasServices.GetEmpresa();
              
              if (isMounted) {
                  setIntereses(DatosIntereses);
                  setUsuarios(DatosUsuarios);
                  setEmpresas(DatosEmpresas);
              }

          } catch (error) {
              if (isMounted) {
                  setErrorIntereses(error.message);
                  setErrorUsers(error.message);
                  setErrorEmpresas(error.message);
              }
          }
      };
  
      fetch();
  
      return () => {
          isMounted = false;
      };
      
  }, []);







  




  return (
    <div id='bodyRegisterEmpresas'>
      <div id='contRegisterEmpresas'>
        <header>
          <svg onClick={volver} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
          </svg>
        </header>
        <h1>Registrar</h1>



        <label htmlFor=""> <span>*</span> Identificación</label><br />
        <input className="inputs1Empresas" type="number" value={Identificacion} onChange={(e) => setIdentificacion(e.target.value)}/><br /><br />

        <label htmlFor=""> <span>*</span> Confirmar Identificación</label><br />
        <input className="inputs1Empresas" type="number" value={ConfirmacionID} onChange={(e) => setConfirmacionID(e.target.value)} />
        

        <div className='DIVbtnREmpresa'>
          <button className='btnNextRegisterEmpresas'>Siguiente</button>
        </div>

        <br />
        <p align="center" className='pRR'>¿Ya tienes una cuenta?, <Link className='LINK' to="/login"> Iniciar sesión</Link></p>
      </div>
    </div>
  )
}

export default RegisterForm2