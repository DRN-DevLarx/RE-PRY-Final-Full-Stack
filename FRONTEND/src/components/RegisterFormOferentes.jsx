import { useState, useEffect } from "react";
import  "../styles/Register.css";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import InteresesServices from '../services/interesesServices';
import UsersServices from "../services/usersServices";
import usuariosServices from "../services/usuariosServices";
import InteUsuariosServices from "../services/interesesUsuariosServices";
import Users_UsuariosServices from "../services/Users_UsuariosServices";

function RegisterForm1() {

  const navigate = useNavigate()
  const [Contenedor2, setContenedor2] = useState(false);
  const [Contenedor3, setContenedor3] = useState(false);

  const [Intereses, setIntereses] = useState([]);
  const [ErrorIntereses, setErrorIntereses] = useState(null);
  
  const [Usuarios, setUsuarios] = useState([]);
  const [ErrorUsuarios, setErrorUsuarios] = useState(null);

  const [Identificacion, setIdentificacion] = useState("");
  const [ConfirmacionID, setConfirmacionID] = useState("");

  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Usuario, setUsuario] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [Confirm_Contraseña, setConfirm_Contraseña] = useState("");


  const simbolosNoPermitidos = [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]",
    "{", "}", ":", ";", "'", '"', "<", ">", "/", "\\", "|", "=", "+"
  ];

  // const correoValido = [".com", ".cr", ".org", ".net", ".edu", ".gov", ".co", ".io", ".info"];

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
              
              if (isMounted) {
                  setIntereses(DatosIntereses);
                  setUsuarios(DatosUsuarios);
              }

          } catch (error) {
              if (isMounted) {
                  setErrorIntereses(error.message);
                  setErrorUsuarios(error.message);
              }
          }
      };
  
      fetch();
  
      return () => {
          isMounted = false;
      };

      
  }, []);



  function exit() {
    setTimeout(() => {
        navigate("/")            
    }, 200);
  }

  function btnSiguiente() {
    
    //validar que las identificaciones tengan solo numeros
    const regex = /^[0-9]+$/;

  
    if (regex.test(Identificacion) && Identificacion === ConfirmacionID && Identificacion !== "" && Identificacion.length === 9) {
      setTimeout(() => {
        setContenedor2(true)
      }, 200);
    } 

    else if(Identificacion.length != 9) {
      Swal.fire({
        icon: "info",
        text: "La identificación debe tener 9 dígitos.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "red",
        confirmButtonText: "Aceptar",
        iconColor: "#2ae2b6",
      })
    }

    else {
      Swal.fire({
        icon: "error",
        iconColor: "#2ae2b6",
        text: "Las identificaciones no coinciden o son inválidas. Porfavor, verifica e intenta nuevamente.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Aceptar",
      })
    }
  }

  function btnSiguiente2() {

    if (Usuarios.find((user) => user.username === Usuario)) {
      Swal.fire({
        icon: "error",
        text: "El usuario ya existe, por favor elige otro.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Aceptar",
      })
      return;
    }

    for (let index = 0; index < dominiosCR.length; index++) {
      const element = dominiosCR[index];
      
      if (Correo.includes(element)) {

        if (Usuarios.find((user) => user.email === Correo)) {
          Swal.fire({
            icon: "error",
            text: "El correo ya está registrado, por favor utiliza otro o inicia sesión",
            confirmButtonColor: "#2ae2b6",
            background: "#1a1a1a",
            color: "#ffffff",
            confirmButtonText: "Aceptar",
          })
          return;
        }
         break;
      }
      else {
        Swal.fire({
          icon: "error",
          text: "El correo electrónico no es válido, por favor verifica e intenta nuevamente.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonText: "Aceptar",
        })
        return;
      }
      
    }


    // Validar que los campos no contengan simbolos no permitidos
    if( Nombre === "" || Apellido === "" || Usuario === "" || Telefono === "" || Correo === "" || contraseña === "" || Confirm_Contraseña === "") {

      Swal.fire({
        icon: "error",
        text: "Por favor, completa todos los campos.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Aceptar",
      })
    }

    else if (contraseña.length < 8) {
      Swal.fire({
        icon: "error",
        text: "La contraseña debe tener al menos 8 caracteres.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Aceptar",
      })
    }

     else if (contraseña !== Confirm_Contraseña) {
      Swal.fire({
        icon: "error",
        text: "Las contraseñas no coinciden.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Aceptar",
      })
    }
    else {
      for (let p = 0; p < palabrasProhibidas.length; p++) {
        if (Nombre.toLowerCase().includes(palabrasProhibidas[p]) || Apellido.toLowerCase().includes(palabrasProhibidas[p]) || Usuario.toLowerCase().includes(palabrasProhibidas[p]) || Telefono.toLowerCase().includes(palabrasProhibidas[p]) || Correo.toLowerCase().includes(palabrasProhibidas[p]) || contraseña.toLowerCase().includes(palabrasProhibidas[p]) || Confirm_Contraseña.toLowerCase().includes(palabrasProhibidas[p])) {

          Swal.fire({
            icon: "error",
            text: `Un campo contiene información no permitida, por favor verifica e intenta nuevamente.`,
            confirmButtonColor: "#2ae2b6",
            background: "#1a1a1a",
            color: "#ffffff",
            confirmButtonText: "Aceptar",
          })
          break;
        }
        else {
          setTimeout(() => {
            setContenedor2(false)
            setContenedor3(true)
          }, 200);
        }
      }

    }
    
  }

  async function btnRegistrarme() {
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedInterests = Array.from(checkboxes).map(checkbox => checkbox.value);
    

    if (selectedInterests.length == 0) {
      Swal.fire({
        icon: "error",
        text: "Por favor, selecciona al menos un interés.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    else {
      try {
        // Post a la tabla auth_user
        const datosRegistroUsers = {
          password: contraseña,
          username: Usuario,
          first_name: Nombre,
          last_name: Apellido,
          email: Correo,
        };
        const respuestaServer = await UsersServices.PostUser(datosRegistroUsers);


        // Post a la tabla Usuarios
        const datosRegistro = {
          identificacion_oferente: Identificacion,
          telefono_oferente: Telefono,
          referenciaIMG_oferente: "",
          estado_oferente: "activo",
        };
        const respuestaServer2 = await usuariosServices.PostUsuario(datosRegistro);


        // Post a la tabla intermedia de Usuarios e intereses
        for (let index = 0; index < selectedInterests.length; index++) {
          const INTERES = selectedInterests[index];

          const datos_A_InteUsuarios = {
            usuario: respuestaServer2.id,
            intereses: INTERES,
          };
          await InteUsuariosServices.PostIntereses(datos_A_InteUsuarios);
        }


        // Post a la tabla intermedia de auth_user y Usuarios

        const datos_A_UsersUsuarios = {
          user: respuestaServer.id,
          usuario: respuestaServer2.id,
        };
        await Users_UsuariosServices.PostUserUsuario(datos_A_UsersUsuarios);

        
        Swal.fire({
          icon: "success",
          text: "Registro exitoso.",
          background: "#1a1a1a",
          color: "#ffffff",
          showConfirmButton: false,
        });

        setTimeout(() => {
          Swal.close();
          navigate("/login");
        }, 700);

      } catch (error) {
        console.error("Error en el proceso de registro:", error);

        Swal.fire({
          icon: "error",
          text: "Hubo un problema con el registro.",
          background: "#1a1a1a",
          color: "#ffffff",
          showConfirmButton: true,
        });
      }
    }


  }

  function ROferente() {
    navigate('/register1')
  }

  function REmpresa () {
    navigate('/registrarEmpresa')
  }




  
  return (
    <div id='bodyRegister'>
      {!Contenedor2 && !Contenedor3 && (
      <div id='contRegister'>
        <header>
          <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
          </svg>
        </header>
        <h1>Registrar</h1>

        <div id='btnsRegister'>
          <button onClick={ROferente} className='btnROferente'> Persona oferente </button>
          <button onClick={REmpresa} className='btnRE'> Empresa </button>
        </div>

        <label htmlFor=""> <span>*</span> Identificación</label><br />
        <input className="inputs1" type="number" value={Identificacion} onChange={(e) => setIdentificacion(e.target.value)}/><br /><br />

        <label htmlFor=""> <span>*</span> Confirmar Identificación</label><br />
        <input className="inputs1" type="number" value={ConfirmacionID} onChange={(e) => setConfirmacionID(e.target.value)} />
        

        <div className='DIVbtnR'>
          <button className='btnNextRegister' onClick={btnSiguiente}>Siguiente</button>
        </div>

        <br />
        <p align="center" className='pRR'>¿Ya tienes una cuenta?, <Link className='LINK' to="/login"> Iniciar sesión</Link></p>
      </div>
      )}
      


      {Contenedor2 && (

        <div id='contRegister'>
          <header>
            <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </header>

          <h1>Registrarse</h1>
          
          <div className="contInputs">
            <input value={Nombre} onChange={(e) => setNombre(e.target.value)} className="inputsR" type="text" placeholder="Nombre" />

            <input value={Apellido} onChange={(e) => setApellido(e.target.value)} className="inputsR" type="text" placeholder="Apellido" />

            <input value={Usuario} onChange={(e) => setUsuario(e.target.value)} className="inputsR" type="text" placeholder="Usuario" />

            <input value={Telefono} onChange={(e) => setTelefono(e.target.value)} className="inputsR" type="number" placeholder="Telefono" />

            <input value={Correo} onChange={(e) => setCorreo(e.target.value)} className="inputsR inptCorreo" type="email" placeholder="Correo electrónico" />

            <input value={contraseña} onChange={(e) => setContraseña(e.target.value)} className="inputsR" type="password" placeholder="Constraseña" />

            <input value={Confirm_Contraseña} onChange={(e) => setConfirm_Contraseña(e.target.value)} className="inputsR" type="password" placeholder="Confirmar constraseña" />
          </div>

          <div className='DIVbtnR'>
            <button className='btnNextRegister' onClick={btnSiguiente2}>Siguiente</button>
          </div>

        </div>
      )}

      {Contenedor3 && (
        <div id='contRegister'>
          <header>
            <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </header>

          <h1>Registrarse</h1>

            <h2>Intereses</h2>
              <div id="ContIntereses">
                {Intereses.map((interes, index) => (
                  <article key={index} className="ItemInteres">
                    <input type="checkbox" id={interes.nombre_interes} value={interes.id} />
                    <label htmlFor={interes.nombre_interes}> {interes.nombre_interes} </label>
                  </article>
                ))}
              </div>


          <div className='DIVbtnR'>
            <button className='btnNextRegister' onClick={btnRegistrarme} >Registrarme</button>
          </div>
        </div>
      )}


    </div>
  )
}

export default RegisterForm1