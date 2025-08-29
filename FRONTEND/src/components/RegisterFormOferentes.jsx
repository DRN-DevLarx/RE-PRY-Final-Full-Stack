import { useState, useEffect } from "react";
import  "../styles/Register.css";

import {Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import InteresesServices from '../services/interesesServices';
import UsersServices from "../services/usersServices";
import usuariosServices from "../services/usuariosServices";
import InteUsuariosServices from "../services/interesesUsuariosServices";
import Users_UsuariosServices from "../services/Users_UsuariosServices";
import User_groupsServices from "../services/User_groupsServices";

function RegisterForm1() {

  const navigate = useNavigate()
  const [Contenedor2, setContenedor2] = useState(false);
  const [Contenedor3, setContenedor3] = useState(false);

  const [Intereses, setIntereses] = useState([]);
  const [ErrorIntereses, setErrorIntereses] = useState(null);
  
  const [Usuarios, setUsuarios] = useState([]);
  const [ErrorUsuarios, setErrorUsuarios] = useState(null);

  const [TableUsuarios, setTableUsuarios] = useState([]);
  const [ErrorTaleUsuarios, setErrorTableUsuarios] = useState(null);


  const [Identificacion, setIdentificacion] = useState("");
  const [ConfirmacionID, setConfirmacionID] = useState("");

  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Usuario, setUsuario] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [Confirm_Contraseña, setConfirm_Contraseña] = useState("");


  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const simbolosNoPermitidos = [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]",
    "{", "}", ":", ";", "'", '"', "<", ">", "/", "\\", "|", "=", "+"
  ];

  const palabrasProhibidas = [
    "admin", "superuser", "password", "puta", "madre","pendejo", "mierda", "caca", "culo", "verga", "coño",
    "chingar", "pendeja", "puto", "cabrón", "cabron", "gilipollas", "maricón", "bollera", "zorra", "pene",  
    "putón", "pendejita", "pendejito","prostituta", "prostituto", "putas", "putos", "pendejos", "pendejas", 
    "cago", "cagó", "cagada", "cagado", "cagarse", "cagón", "cagones", "cagar", "cagando", "como", "vagina", 
    "putita", "meto", "cojo", "cojer", "hdp"];

  useEffect(() => {
    let isMounted = true; 
    const fetch = async () => {
      try {
        const DatosIntereses = await InteresesServices.GetIntereses();
        const DatosUsuarios = await UsersServices.GetUser();
        const DatosTableUsuarios = await usuariosServices.GetUsuario();
        
        if (isMounted) {
            setIntereses(DatosIntereses);
            setUsuarios(DatosUsuarios);
            setTableUsuarios(DatosTableUsuarios);
        }

      } catch (error) {
        if (isMounted) {
            setErrorIntereses(error.message);
            setErrorUsuarios(error.message);
            setErrorTableUsuarios(error.message);
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
      // Validar que la identificación solo contenga números y tenga exactamente 9 dígitos
      const regex = /^[0-9]+$/;

      // const VerifarIdentificacion = TableUsuarios.find(TableUsuario => TableUsuario.identificacion_oferente == Identificacion)
      const VerifarIdentificacion = TableUsuarios.some((TableUsuario) => TableUsuario.identificacion_oferente == Identificacion)
          
      
      if (!regex.test(Identificacion) || Identificacion.length !== 9) {
          Swal.fire({
              icon: "info",
              text: "La identificación debe tener 9 dígitos y solo contener números.",
              confirmButtonColor: "#2ae2b6",
              background: "#1a1a1a",
              color: "red",
              confirmButtonText: "Verificar",
              iconColor: "#2ae2b6",
          });
      }

      else if (Identificacion !== ConfirmacionID) {
        Swal.fire({
            icon: "error",
            iconColor: "#2ae2b6",
            text: "Las identificaciones no coinciden. Por favor verifica e intenta nuevamente.",
            confirmButtonColor: "#2ae2b6",
            background: "#1a1a1a",
            color: "#ffffff",
            confirmButtonText: "Verificar",
        });
      }
      else if (VerifarIdentificacion) {
        Swal.fire({
          icon: "error",
          text: "La identifcación ya está registrada, por favor inicia sesión.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          showConfirmButton: false,
          timer: 3000,
        });

        return false;
      }
      else {


        // Llamar API para verificar si la identificación existe
        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://apis.gometa.org/cedulas/${Identificacion}`, {
      
                });

                const data = await response.json();
                
                  if (data.resultcount == 0) {
                      Swal.fire({
                          icon: "error",
                          text: "Identificación inválida o no encontrada.",
                          confirmButtonColor: "#2ae2b6",
                          background: "#1a1a1a",
                          color: "red",
                          confirmButtonText: "Verificar",
                          iconColor: "#2ae2b6",
                      });
                    return;
                }
                const firstname = data.results?.[0]?.firstname;
                const lastname = data.results?.[0]?.lastname;

                setNombre(firstname)
                setApellido(lastname)
                
                // Si pasa todas las validaciones, proceder al siguiente paso
                setTimeout(() => {
                    setContenedor2(true);
                }, 200);

            } catch (error) {
                console.error("Error al validar identificación:", error);
                Swal.fire({
                    icon: "error",
                    text: "Ocurrió un error al consultar la identificación. Intenta nuevamente.",
                    confirmButtonColor: "#2ae2b6",
                    background: "#1a1a1a",
                    color: "red",
                    confirmButtonText: "Intentar de nuevo",
                    iconColor: "#2ae2b6",
                });
            }
        };

        fetchUsers();
      }
  }


  function btnSiguiente2() {

  const validarUsuarioExistente = (usuario) => {
    
    if (Usuarios.some((user) => user.username === usuario)) {
      Swal.fire({
        icon: "error",
        text: "El usuario ya existe, por favor elige otro.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Verificar",
      });
      return false;
    }
    return true;
  };

  const validarSimbolos = (usuario) => {
    const simboloInvalido = simbolosNoPermitidos.find((simbolo) => usuario.includes(simbolo));
    
    if (simboloInvalido) {
      Swal.fire({
        icon: "error",
        text: "El usuario incluye símbolos no permitidos.",
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
    const prefijosCostaRica = [8, 7, 6, 57, 21, 22, 24, 25, 26, 27,800];

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

  const validarCorreo = (Correo) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(Correo);
  };

  if (!validarCorreo(Correo)) {
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
  else if (Usuarios.some((user) => user.email === Correo)) {
    Swal.fire({
      icon: "error",
      text: "El correo ya está registrado, por favor utiliza otro o inicia sesión.",
      confirmButtonColor: "#2ae2b6",
      background: "#1a1a1a",
      color: "#ffffff",
      confirmButtonText: "Verificar",
    });
    return false;
  }


const validarCampos = (nombre, apellido, usuario, telefono, correo, contraseña, confirmContraseña) => {
  if (![nombre, apellido, usuario, telefono, correo, contraseña, confirmContraseña].every(campo => campo.trim() !== "")) {
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
  if (contraseña.length < 8) {
    Swal.fire({
      icon: "error",
      text: "La contraseña debe tener al menos 8 caracteres.",
      confirmButtonColor: "#2ae2b6",
      background: "#1a1a1a",
      color: "#ffffff",
      confirmButtonText: "Verificar",
    });
    return false;
  }

  if (contraseña !== confirmContraseña) {
    Swal.fire({
      icon: "error",
      text: "Las contraseñas no coinciden.",
      confirmButtonColor: "#2ae2b6",
      background: "#1a1a1a",
      color: "#ffffff",
      confirmButtonText: "Verificar",
    });
    return false;
  }
  return true;
};

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

const ejecutarValidaciones = () => {
  const datosUsuario = [Nombre, Apellido, Usuario, Telefono, Correo, contraseña, Confirm_Contraseña];

  if (
    validarUsuarioExistente(Usuario) &&
    validarTelefono(Telefono) &&
    validarSimbolos(Usuario) &&
    validarCorreo(Correo) &&
    validarCampos(Nombre, Apellido, Usuario, Telefono, Correo, contraseña, Confirm_Contraseña) &&
    validarPalabrasProhibidas(datosUsuario)
  ) {
    setTimeout(() => {
      setContenedor2(false);
      setContenedor3(true);
    }, 200);
  }
};

ejecutarValidaciones();

    
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
        confirmButtonText: "Verificar",
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
        console.log(respuestaServer);
        

        // Post a la tabla Usuarios
        const datosRegistro = {
          identificacion_oferente: Identificacion,
          telefono_oferente: Telefono,
          referenciaIMG_oferente: "",
          estado_oferente: "activo",
        };

        const respuestaServer2 = await usuariosServices.PostUsuario(datosRegistro);
        console.log(respuestaServer2);
        

        // Post a la tabla intermedia de Usuarios e intereses
        for (let index = 0; index < selectedInterests.length; index++) {
          const INTERES = selectedInterests[index];

          const datos_A_InteUsuarios = {
            usuario: respuestaServer2.id,
            intereses: INTERES,
          };
          console.log(await InteUsuariosServices.PostInteUser(datos_A_InteUsuarios))
           
        }



        // Post a la tabla intermedia de auth_user y Usuarios

        const datos_A_UsersUsuarios = {
          user: respuestaServer.id,
          usuario: respuestaServer2.id,
        };

        console.log(await Users_UsuariosServices.PostUserUsuario(datos_A_UsersUsuarios));
        

        // Post a la tabla intermedia de auth_user_groups
        const datos_A_auth_user_groups = {
          user: respuestaServer.id,
          group: 2,   // Rol Oferente
        };

        console.log(await User_groupsServices.PostUser_group(datos_A_auth_user_groups));
        
      
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
    navigate('/registrarse')
  }

  function REmpresa () {
    navigate('/registrarEmpresa')
  }
  
  return (
    <div id='bodyRegister'>

      {!Contenedor2 && !Contenedor3 && (
      
        <div id='contRegister'>
        
          <header>
            <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
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
          {/* <h1>Holaaa: {users.results}</h1> */}

          <header>
            <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </header>

          <h1>Registrarse</h1>
          
          <div className="contInputs">
            <input disabled value={Nombre} className="inputsR" type="text" placeholder={Nombre} />

            <input disabled value={Apellido} className="inputsR" type="text" placeholder="Apellido" />

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