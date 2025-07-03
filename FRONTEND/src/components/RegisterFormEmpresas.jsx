import { useState, useEffect } from "react";
import {Link, useNavigate } from 'react-router-dom';

import  "../styles/RegisterEmpresas.css";

import Swal from 'sweetalert2';
import UsersServices from "../services/usersServices";
import InteresesServices from '../services/interesesServices';
import empresasServices from "../services/empresasServices";
import Users_EmpresasServices from "../services/Users_EmpresasServices";
import User_groupsServices from "../services/User_groupsServices";

// import InteUsuariosServices from "../services/interesesUsuariosServices";
// import Users_UsuariosServices from "../services/Users_UsuariosServices";
// import User_groupsServices from "../services/User_groupsServices";


function RegisterForm2() {

  const navigate = useNavigate()
  const [Contenedor2, setContenedor2] = useState(false);
  const [Contenedor3, setContenedor3] = useState(false);

  const [IDEmpresa, setIdentificacion] = useState('');
  const [ConfirmacionID, setConfirmacionID] = useState('');

  const Identificacion = IDEmpresa.replace(/[^0-9\s]/g, "");


  const [Empresas, setEmpresas] = useState([]);
  const [ErrorEmpresas, setErrorEmpresas] = useState(null);

  const [Usuarios, setUsuarios] = useState([]);
  const [ErrorUsuarios, setErrorUsuarios] = useState(null);

  const [Intereses, setIntereses] = useState([]);
  const [ErrorIntereses, setErrorIntereses] = useState(null);


  const [Nombre, setNombre] = useState("");
  // const [Apellido, setApellido] = useState("");
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
    navigate('/registrarse')
  }

  function REmpresa () {
    navigate('/registrarEmpresa')
  }


  


  const simbolosNoPermitidos = [
    " ", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]",
    "{", "}", ":", ";", "'", '"', "<", ">", "/", "\\", "|", "=", "+"
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
                  setErrorUsuarios(error.message);
                  setErrorEmpresas(error.message);
              }
          }
      };
  
      fetch();
  
      return () => {
          isMounted = false;
      };
      
  }, []);



  function btnSiguiente() {
      

    
    // const VerifarIdentificacion = TableEmpresas.find(TableEmpresa => TableEmpresa.identificacion_oferente == Identificacion)
    const VerifarIdentificacion = Empresas.some((TableEmpresa) => TableEmpresa.identificacion_empresa == Identificacion) 
    
    const regex = /^[0-9]+$/;

    if (IDEmpresa !== ConfirmacionID) {
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

              console.log(data);
              
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
              const fullname = data.nombre
              // const firstname = data.results?.[0]?.firstname;
              // const lastname = data.results?.[0]?.lastname;

              setNombre(fullname)
              // setApellido(lastname)
              
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
  

  async function btnRegistrarme() {
    

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
      const prefijosCostaRica = [8, 7, 6, 57, 21, 22, 24, 25, 26, 27];

      const validarTelefono = prefijosCostaRica.some(prefijo => Telefono.toString().startsWith(prefijo.toString()));
      
      console.log(validarTelefono);
      

      const regex = /^[0-9]+$/;

      if (regex.test(Telefono) && Telefono.length >=8 && validarTelefono == true ) {
        return "Telefono valido"
      }

      else {

        Swal.fire({
          icon: "error",
          text: "El número de telefono es invalido. Porfavor verifica e intenta nuevamente",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonText: "Verificar",
        });
      }
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


  const validarCampos = (nombre, usuario, telefono, correo, contraseña, confirmContraseña) => {
    if (![nombre, usuario, telefono, correo, contraseña, confirmContraseña].every(campo => campo.trim() !== "")) {
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
    const datosUsuario = [Nombre, Usuario, Telefono, Correo, contraseña, Confirm_Contraseña];

    if (
      validarUsuarioExistente(Usuario) &&
      validarTelefono(Telefono) &&
      validarSimbolos(Usuario) &&
      validarCorreo(Correo) &&
      validarCampos(Nombre, Usuario, Telefono, Correo, contraseña, Confirm_Contraseña) &&
      validarPalabrasProhibidas(datosUsuario)
    ) {
      InsertarDatos()
    }
  };

  ejecutarValidaciones();

  async function InsertarDatos() {
    try {
      // Post a la tabla auth_user
      const datosRegistroUsers = {
        password: contraseña,
        username: Usuario,
        first_name: Nombre,
        last_name: "",
        email: Correo,
      };
  
      const respuestaServerUser = await UsersServices.PostUser(datosRegistroUsers);
            
      const identEmpresa = Number(Identificacion)
  
      // Post a la tabla Empresas
      const datosRegistroEmpresa = {
        identificacion_empresa: Identificacion,
        telefono_empresa: Telefono,
        ubicacion_empresa: "",
        referenciaIMG_empresa: "",
        estado_empresa: "activo",
      };

      console.log(datosRegistroEmpresa);
      
    
      const respuestaServerEmpresa = await empresasServices.PostEmpresa(datosRegistroEmpresa);

      console.log(respuestaServerEmpresa);
      
  


      // Post a la tabla intermedia de auth_user y Empresas
  
      const datos_A_UsersEmpresas = {
        user: respuestaServerUser.id,
        empresa: respuestaServerEmpresa.id,
      };
  
      console.log(datos_A_UsersEmpresas);
      
      await Users_EmpresasServices.PostUserEmpresa(datos_A_UsersEmpresas);
  
  
      // Post a la tabla intermedia de auth_user_groups
  
      const datos_A_auth_user_groups = {
        user: respuestaServerUser.id,
        group: 3,   // Rol empresa
      };
  
      await User_groupsServices.PostUser_group(datos_A_auth_user_groups) 
  
      
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
  

  return (
    <div id='bodyRegisterEmpresas'>
      {!Contenedor2 && !Contenedor3 && (

      <div id='contRegisterEmpresas'>
        <header>
          <svg onClick={volver} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
          </svg>
        </header>
        <h1>Registrar</h1>

        <div id='btnsRegisterEmpresas'>
          <button onClick={ROferente} className='btnROferenteE'> Persona oferente </button>
          <button onClick={REmpresa} className='btnREmpresa'> Empresa </button>
        </div>


        <label htmlFor=""> <span>*</span> Identificación</label><br />
        <input className="inputs1Empresas" type="text" value={IDEmpresa} onChange={(e) => setIdentificacion(e.target.value)}/><br /><br />

        <label htmlFor=""> <span>*</span> Confirmar Identificación</label><br />
        <input className="inputs1Empresas" type="text" value={ConfirmacionID} onChange={(e) => setConfirmacionID(e.target.value)} />
        

        <div className='DIVbtnREmpresa'>
          <button onClick={btnSiguiente} className='btnNextRegisterEmpresas'>Siguiente</button>
        </div>

        <br />
        <p align="center" className='pRR'>¿Ya tienes una cuenta?, <Link className='LINK' to="/login"> Iniciar sesión</Link></p>
      </div>

      )}

      {Contenedor2 && (

        <div id='contRegister'>

          <header>
            <svg onClick={volver} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </header>

          <h1>Registrarse</h1>      
    
          <div className="contInputs">
            <input disabled value={Nombre} className="inputsR inptNombreEmpresa" type="text" placeholder={Nombre} />

            {/* <input disabled value={Apellido} className="inputsR" type="text" placeholder="Apellido" /> */}

            <input value={Usuario} onChange={(e) => setUsuario(e.target.value)} className="inputsR" type="text" placeholder="Usuario" />

            <input value={Telefono} onChange={(e) => setTelefono(e.target.value)} className="inputsR" type="text" placeholder="Telefono" />

            <input value={Correo} onChange={(e) => setCorreo(e.target.value)} className="inputsR inptCorreo" type="email" placeholder="Correo electrónico" />

            <input value={contraseña} onChange={(e) => setContraseña(e.target.value)} className="inputsR" type="password" placeholder="Constraseña" />

            <input value={Confirm_Contraseña} onChange={(e) => setConfirm_Contraseña(e.target.value)} className="inputsR" type="password" placeholder="Confirmar constraseña" />
          </div>

          <div className='DIVbtnR'>
            <button className='btnNextRegister' onClick={btnRegistrarme} >Registrar</button>
          </div>

        </div>
      )}

    </div>
  )
}

export default RegisterForm2