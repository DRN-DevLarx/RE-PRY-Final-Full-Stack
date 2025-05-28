import { useState, useEffect } from "react";
import  "../styles/Register.css";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import InteresesServices from '../services/interesesServices';
import UsuariosServices from "../services/UsuariosServices"


function RegisterForm1() {

  const navigate = useNavigate()
  const [Contenedor2, setContenedor2] = useState(false);
  const [Contenedor3, setContenedor3] = useState(false);
  const [Intereses, setIntereses] = useState([]);
  const [ErrorIntereses, setErrorIntereses] = useState(null);

  const [Identificacion, setIdentificacion] = useState("");
  const [ConfirmacionID, setConfirmacionID] = useState("");

  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Usuario, setUsuario] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Fecha_Nacimiento, setFecha_Nacimiento] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [Confirm_Contraseña, setConfirm_Contraseña] = useState("");


  const simbolosNoPermitidos = [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]",
    "{", "}", ":", ";", "'", '"', "<", ">", "/", "\\", "|", "=", "+"
  ];

  const palabrasProhibidas = [
    "admin", "root", "superuser", "guest", "password", "1234", "qwerty", "puta", "madre","pendejo", "mierda", "caca", "culo", "verga", "coño", "chingar", "pendeja", "puto", "cabrón", "cabron", "gilipollas", "maricón", "bollera", "zorra", "putita", "putón", "pendejita", "pendejito","prostituta", "prostituto", "putas", "putos", "pendejos", "pendejas", "cago", "cagó", "cagada", "cagado", "cagarse", "cagón", "cagones", "cagar", "cagando", "como", "vagina", "pene", "meto", "cojo", "cojer"];

  useEffect(() => {
      let isMounted = true; 
      const fetch = async () => {
          try {
              const DatosIntereses = await InteresesServices.GetIntereses();

              if (isMounted) {
                  setIntereses(DatosIntereses);
              }
          } catch (error) {
              if (isMounted) {
                  setErrorIntereses(error.message);
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

    // Validar que los campos no contengan simbolos no permitidos
    if( Nombre === "" || Apellido === "" || Usuario === "" || Telefono === "" || Correo === "" || Fecha_Nacimiento === "" || contraseña === "" || Confirm_Contraseña === "") {

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
        if (Nombre.toLowerCase().includes(palabrasProhibidas[p]) || Apellido.toLowerCase().includes(palabrasProhibidas[p]) || Usuario.toLowerCase().includes(palabrasProhibidas[p]) || Telefono.toLowerCase().includes(palabrasProhibidas[p]) || Correo.toLowerCase().includes(palabrasProhibidas[p]) || Fecha_Nacimiento.toLowerCase().includes(palabrasProhibidas[p]) || contraseña.toLowerCase().includes(palabrasProhibidas[p]) || Confirm_Contraseña.toLowerCase().includes(palabrasProhibidas[p])) {

          Swal.fire({
            icon: "error",
            text: `Un campo contiene información no permitida, por favor verifica e intenta nuevamente.`,
            confirmButtonColor: "#2ae2b6",
            background: "#1a1a1a",
            color: "#ffffff",
            confirmButtonText: "Aceptar",
          })
          // break;
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
    
    if (selectedInterests.length < 1) {
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

    else if (selectedInterests.length > 0) {
      console.log("Intereses seleccionados:", selectedInterests);
      console.log(Identificacion);
      console.log(Nombre);
      console.log(Apellido);
      console.log(Usuario);
      console.log(Telefono);
      console.log(Correo);
      console.log(Fecha_Nacimiento);
      console.log(contraseña);
      console.log(Confirm_Contraseña);
      
      
      

      const datosRegistro = {
        identificacion_oferente: Identificacion,
        rol_oferente: "Oferente",
        nombre_oferente: Nombre,
        apellido_oferente: Apellido,
        usuario: Usuario,
        contrasena_oferente: contraseña,
        telefono_oferente: Telefono,
        correo_oferente: Correo,
        referenciaIMG_oferente: "default.png", // Asignar una imagen por defecto
        estado_oferente: "Activo",
        intereses: selectedInterests
      };

      const respuestaServer = await UsuariosServices.PostUsuario(datosRegistro)
      console.log(respuestaServer)
    
      Swal.fire({
        icon: "success",
        text: "Registro exitoso. Por favor, inicia sesión.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate('/login');
      });
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
            <input value={Nombre} onChange={(e) => setNombre(e.target.value)} className="inputs" type="text" placeholder="Nombre" />

            <input value={Apellido} onChange={(e) => setApellido(e.target.value)} className="inputs" type="text" placeholder="Apellido" /><br /><br />

            <input value={Usuario} onChange={(e) => setUsuario(e.target.value)} className="inputs" type="text" placeholder="Usuario" />

            <input value={Telefono} onChange={(e) => setTelefono(e.target.value)} className="inputs" type="number" placeholder="Telefono" /><br /><br />

            <input value={Correo} onChange={(e) => setCorreo(e.target.value)} className="inputs" type="email" placeholder="Correo electrónico" />

            <input value={Fecha_Nacimiento} onChange={(e) => setFecha_Nacimiento(e.target.value)} className="inputs" type="date" placeholder="Fecha de nacimiento" /><br /><br />

            <input value={contraseña} onChange={(e) => setContraseña(e.target.value)} className="inputs" type="password" placeholder="Constraseña" />

            <input value={Confirm_Contraseña} onChange={(e) => setConfirm_Contraseña(e.target.value)} className="inputs" type="password" placeholder="Confirmar constraseña" /><br /><br />
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
                    <input type="checkbox" id={interes.nombre_interes} value={interes.nombre_interes} />
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