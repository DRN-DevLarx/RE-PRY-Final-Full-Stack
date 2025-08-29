import { useNavigate } from 'react-router-dom';
import usersServices from '../services/usersServices';
import usuariosServices from '../services/usuariosServices';
import Users_UsuariosServices from '../services/Users_UsuariosServices';
import User_groupsServices from '../services/User_groupsServices';

import { useState, useEffect } from 'react'

import {CerrarDashboard} from "./CerrarDashboard"
import GetCookie from '../services/GetCookie';
import Swal from 'sweetalert2';
import cloudDinaryServices from '../services/cloudDinaryServices';

import '../styles/UsRegi.css';
import { jwtDecode } from "jwt-decode";


function UserRegi() {

    const simbolosNoPermitidos = [
        "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]",
        "{", "}", ":", ";", "'", '"', "<", ">", "/", "\\", "|", "=", "+"
    ];

    const palabrasProhibidas = [
        "admin", "superuser", "password", "puta", "madre","pendejo", "mierda", "caca", "culo", "verga", "coño",
        "chingar", "pendeja", "puto", "cabrón", "cabron", "gilipollas", "maricón", "bollera", "zorra", "pene",  
        "putón", "pendejita", "pendejito","prostituta", "prostituto", "putas", "putos", "pendejos", "pendejas", 
        "cago", "cagó", "cagada", "cagado", "cagarse", "cagón", "cagones", "cagar", "cagando", "como", "vagina", 
        "putita", "meto", "cojo", "cojer"
    ];

    const navigate = useNavigate();

    function CerrarD() {
        CerrarDashboard(navigate)

    }
    
    const [IMgUser, setIMgUser] = useState("https://res.cloudinary.com/dateuzds4/image/upload/v1750454292/FB_sby2fv.avif");
    
    const [DatosIntermedios, setDatosIntermedios] = useState([]);

    const [Users, setUsers] = useState([]);
    const [ErrorUsers, setErrorUsers] = useState(null);
    
    const [Usuarios, setUsuarios] = useState([]);
    const [ErrorUsuarios, setErrorUsuarios] = useState(null);
    
    const [DatosGroups, setDatosGroups] = useState([]);
    
    const [ContVerUser, setContVerUser] = useState(false)
    const [Editando, setEditando] = useState(false);
    const [IsActivo, setIsActivo] = useState(true);

    const [idUser, setidUser] = useState()
    const IDusuario = DatosIntermedios.find(item => item.user == idUser)?.usuario;    

    const accessToken = GetCookie.getCookie("access_token");
    const idUserCookie = jwtDecode(accessToken).user_id;
    

    const [Identificacion, setIdentificacion] = useState("")
    const [ContraAdmin, setContraAdmin] = useState("")
    const [UsuarioAEditar, setUsuarioAEditar] = useState("")
    const [UserSelecionado, setUserSelecionado] = useState("")
    const [EmailSelecionado, setEmailSelecionado] = useState("")

    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [TelefonoAEditar, setTelefonoAEditar] = useState("")
    const [CorreoAEditar, setCorreoAEditar] = useState("")

    const [ImagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [VistaIMG, setVistaIMG] = useState(null);

    useEffect(() => {

    const fetchData = async () => {
        const datosIntermedios = await Users_UsuariosServices.GetUserUsuario();

        if (datosIntermedios.length > 0) {
            const userIds = datosIntermedios.map(item => item.user);
            const usuarioIds = datosIntermedios.map(item => item.usuario);

            const datosUsers = await usersServices.GetUsersByIds(userIds);
            const datosUsuarios = await usuariosServices.GetUsuariosByIds(usuarioIds);
            const datosGroups = await User_groupsServices.GetUser_group();

            if (datosUsers && datosUsuarios && datosGroups) {
                setDatosIntermedios(datosIntermedios);
                setUsers(datosUsers);
                setUsuarios(datosUsuarios);
                setDatosGroups(datosGroups);
            }
        }
    }

    fetchData();
    }, []);
       

    function volver() {
        setidUser()
        setContVerUser(false)        
    }

    function VerUser(id) {
        setidUser(id)
        setContVerUser(true)        
    }

    function EditarPerfil() {


        DatosIntermedios.filter((dato) => dato.user == idUser).map((dato) => {
            
            const user = Users.find((u) => u.id == dato.user);
            const usuario = Usuarios.find((us) => us.id == dato.usuario);
            
            setUsuarioAEditar(user.username),
            setUserSelecionado(user.username),

            setFirstName(user.first_name),
            setLastName(user.last_name),

            setCorreoAEditar(user.email),
            setEmailSelecionado(user.email)

            setIdentificacion(usuario.identificacion_oferente),
            setTelefonoAEditar(usuario.telefono_oferente)
        })

        setEditando(true);
    }

    useEffect(() => {
    const userEncontrado = Usuarios.find(
        (user) =>
        user.id == IDusuario &&
        user.referenciaIMG_oferente &&
        user.referenciaIMG_oferente == "null"
    );

    if (userEncontrado) {
        setIMgUser(userEncontrado.referenciaIMG_oferente);
    }
    }, [Usuarios, IDusuario]);


    const InsertIMGDefault = (e) => {
        setIMgUser("https://res.cloudinary.com/dateuzds4/image/upload/v1750454292/FB_sby2fv.avif")
    }
    
    const CambioImagen = (e) => {
      const file = e.target.files[0];
    
      if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
        if (!validTypes.includes(file.type) || !validExtensions.includes(fileExtension)) {
          Swal.fire({
            icon: 'error',
            title: 'Formato no permitido',
            text: 'Solo se permiten archivos JPG, JPEG, PNG o WEBP.',
    
          });
          e.target.value = ''; // Limpia el input
          return;
        }
    
        setVistaIMG(URL.createObjectURL(file));
        setImagenSeleccionada(file);
      }
    };

    const manejarEliminarImagen = () => {
        setVistaIMG(null);
        setImagenSeleccionada(null);
    };  

    ////////////////////////////

    function GuardarCambios() {
        ejecutarValidaciones();
    }

    ////////////////////////////


    const validarCampos = (ContraAdmin, UsuarioAEditar, TelefonoAEditar, CorreoAEditar) => {
        if (![ContraAdmin, , UsuarioAEditar, TelefonoAEditar, CorreoAEditar].every(campo => campo.trim() !== "")) {
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

    const validarUsuario = (UsuarioAEditar) => {
    
    if(UsuarioAEditar.length < 5) {
        Swal.fire({
            icon: "error",
            text: "El usuario debe contener al menos 5 carácteres.",
            confirmButtonColor: "#2ae2b6",
            background: "#1a1a1a",
            color: "#ffffff",
            confirmButtonText: "Verificar",
            });
            return false;
        }

    const UserEncontrado = Users.find((user) => user.username == UserSelecionado)
    
    if (Users.some((user) => user.username == UsuarioAEditar && user != UserEncontrado)) {
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

    const validarSimbolos = (UsuarioAEditar) => {
    const simboloInvalido = simbolosNoPermitidos.find((simbolo) => UsuarioAEditar.includes(simbolo));
    
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

    const validarTelefono = (TelefonoAEditar) => {
    const prefijosCostaRica = [8, 7, 6, 57, 21, 22, 24, 25, 26, 27,800];

    const validarTelefono = prefijosCostaRica.some(prefijo => TelefonoAEditar.toString().startsWith(prefijo.toString()));
        
    const regex = /^[0-9]+$/;

    if (regex.test(TelefonoAEditar) && TelefonoAEditar.length >=8 && validarTelefono == true ) {
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

    const validarCorreo = (correo, Users) => {
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

        const EmailEncontrado = Users.find((user) => user.email == EmailSelecionado)
    
        if (Users.some((user) => user.email == CorreoAEditar && user != EmailEncontrado)) {
            Swal.fire({
                icon: "error",
                text: "El correo ya está registrado.",
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
    
    async function ValidarContrasena(ContraAdmin) {

        const UserFind = Users.find(user => user.id == idUserCookie);
        const UsernameFind = UserFind.username

        const credentials = {
            username: UsernameFind,
            password: ContraAdmin,
        }; 
        console.log(credentials);
        

        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });

        if (response.ok === false) {
            Swal.fire({
                icon: "error",
                text: "La contraseña es incorrecta. Porfavor intenta nuevamente",
                background: "#1a1a1a",
                color: "#ffffff",
                showConfirmButton: false,
                timer: 3000,
            });

            return false
            
        }
        else {
            return true           
        }
        
    }

    async function ejecutarValidaciones() {
        const datosUsuario = [ContraAdmin, UsuarioAEditar, TelefonoAEditar, CorreoAEditar];

        if (
            validarCampos(ContraAdmin, UsuarioAEditar, TelefonoAEditar, CorreoAEditar) &&
            validarUsuario(UsuarioAEditar) &&
            validarTelefono(TelefonoAEditar) &&
            validarSimbolos(UsuarioAEditar) &&
            validarCorreo(CorreoAEditar, Users) &&
            validarPalabrasProhibidas(datosUsuario)
        ) {

            const esContrasenaCorrecta = await ValidarContrasena(ContraAdmin);

            if (esContrasenaCorrecta) {
                Swal.fire({
                    icon: "info",
                    title: "Crear nueva contraseña para el usuario",
                    confirmButtonColor: "#2ae2b6",
                    background: "#1a1a1a",
                    color: "#ffffff",
                    confirmButtonText: "Aceptar",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    html: `
                        <input id="swal-input1" class="swal2-input" placeholder="Contraseña">
                        <input id="swal-input2" class="swal2-input" placeholder="Confirmar Contraseña">
                    `,
                    focusConfirm: false,
                    preConfirm: () => {
                        return [
                            document.getElementById('swal-input1').value,
                            document.getElementById('swal-input2').value
                        ];
                    }
                }).then((result) => {
                    if (!result.value[0] || !result.value[1]) {
                        Swal.fire({
                            icon: "error",
                            iconColor: "#2ae2b6",
                            text: "Por favor digita la nueva contraseña.",
                            confirmButtonColor: "#2ae2b6",
                            background: "#1a1a1a",
                            color: "#ffffff",
                            confirmButtonText: "Digitar",
                        });
                    } else if (result.value[0].length < 8) {
                        Swal.fire({
                            icon: "error",
                            iconColor: "#2ae2b6",
                            text: "La contraseña debe tener al menos 8 caracteres.",
                            confirmButtonColor: "#2ae2b6",
                            background: "#1a1a1a",
                            color: "#ffffff",
                            confirmButtonText: "Verificar",
                        });
                    } else if (result.value[0] !== result.value[1]) {
                        Swal.fire({
                            icon: "error",
                            iconColor: "#2ae2b6",
                            text: "Las contraseñas no coinciden. Por favor verifica e intenta nuevamente.",
                            confirmButtonColor: "#2ae2b6",
                            background: "#1a1a1a",
                            color: "#ffffff",
                            confirmButtonText: "Verificar",
                        });
                    } else {
                        setTimeout(() => {
                            ActualizarDatos(result.value[0]);
                        }, 3000);
                    }
                });

            }
        }
    }

    async function DesactivarUsuario() {
    
        Swal.fire({
            icon: "question",
            iconColor: "#2ae2b6",
            text: "¿Deseas desactivar a este usuario?",
            confirmButtonColor: "#9ACD32",
            background: "#1a1a1a",
            color: "#ffffff",
            confirmButtonText: "Sí, desactivar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        }).then(async (result) => {

            if (result.isConfirmed) {
                const obj = {
                    is_active: false,
                };

                console.log(idUser);
                
                const PutUser = await usersServices.PutUserPatch(idUser, obj);
                
                console.log(PutUser);
                
                if(PutUser) {
                    Swal.fire({
                        icon: "success",
                        iconColor: "#2ae2b6",
                        text: "El usuario ha sido desactivado con exito.",
                        showConfirmButton: false,
                        background: "#1a1a1a",
                        color: "#ffffff",
                        timer: 1500,
                    })
                    setIsActivo(false)
                }
                else {
                    Swal.fire({
                        icon: "error",
                        iconColor: "#2ae2b6",
                        text: "Ocurrió un error al actualizar el usuario",
                        showConfirmButton: false,
                        background: "#1a1a1a",
                        color: "#ffffff",
                        timer: 1500,
                    })
                }
            }
        });


    }

    async function ActivarUsuario() {
    
        Swal.fire({
            icon: "question",
            iconColor: "#2ae2b6",
            text: "¿Deseas activar a este usuario?",
            confirmButtonColor: "#008000",
            background: "#1a1a1a",
            color: "#ffffff",
            confirmButtonText: "Sí, activar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        }).then(async (result) => {

            if (result.isConfirmed) {
                const obj = {
                    is_active: true,
                };

                const PutUser = await usersServices.PutUserPatch(idUser, obj);
                
                if(PutUser) {
                    Swal.fire({
                        icon: "success",
                        iconColor: "#2ae2b6",
                        text: "El usuario ha sido activado con exito.",
                        showConfirmButton: false,
                        background: "#1a1a1a",
                        color: "#ffffff",
                        timer: 1500,
                    })
                    setIsActivo(true)
                }
            }
        });
    }

    async function EliminarUsuario() {
    
        Swal.fire({
            icon: "question",
            iconColor: "#2ae2b6",
            text: "¿Deseas eliminar permanentemente a este usuario?",
            confirmButtonColor: "#DC143C",
            background: "#1a1a1a",
            color: "#ffffff",
            confirmButtonText: "Sí, eliminar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        }).then(async (result) => {

            if (result.isConfirmed) {


                const DeleteUser = await usersServices.DeleteUser(idUser);
                
                if(DeleteUser) {
                    Swal.fire({
                        icon: "success",
                        iconColor: "#2ae2b6",
                        text: "El usuario ha sido eliminado con exito.",
                        showConfirmButton: false,
                        background: "#1a1a1a",
                        color: "#ffffff",
                        timer: 1500,
                    })
                    location.reload()
                }
            }
        });
    }

    async function ActualizarDatos(NuevaContraseña) {

        console.log(UsuarioAEditar);
        
        const UpdateData = {
            password: NuevaContraseña,
            username: UsuarioAEditar,
            email: CorreoAEditar,
        }
        
        const respuestaUpdateData = await usersServices.PutUserPatch(idUser, UpdateData);
        
        console.log(respuestaUpdateData);
        
        if(respuestaUpdateData) {
            const uploadedUrl = await cloudDinaryServices.uploadImage(ImagenSeleccionada);

            console.log(uploadedUrl);
            
            const UpdateUsuarioData = {
                telefono_oferente: TelefonoAEditar,
                referenciaIMG_oferente: uploadedUrl,
            }

            const respuestaUpdateUsuarioData = await usuariosServices.PutUsuarioPatch(IDusuario, UpdateUsuarioData)

            console.log(respuestaUpdateUsuarioData);
            
            if (respuestaUpdateUsuarioData) {
                Swal.fire({
                    icon: "success",
                    text: "Información actualizada con exito.",
                    background: "#1a1a1a",
                    color: "#ffffff",
                    showConfirmButton: false,
                    timer: 1500,
                })

                setTimeout(() => {
                    location.reload()
                }, 1600);

            }
        }
        else {
            Swal.fire({
            icon: "error",
            text: "Hubo un problema al guardar los cambios.",
            background: "#1a1a1a",
            color: "#ffffff",
            showConfirmButton: true,
            });
        }

    }


  return (
    <div id='ContUltimasPublicaciones'>
      <div className='headerDashboard'>
        <h3>Usuarios registrados</h3>
        <svg onClick={CerrarD} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
          <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
        </svg>
      </div>

    {!ContVerUser && (

        <div className="Cont2">
            {DatosIntermedios.map((dato, index) => {
                const user = Users.find((u) => u.id == dato.user);
                const usuario = Usuarios.find((us) => us.id == dato.usuario);



                if (!user || !usuario) return null;

                const IMgUser2 = usuario.referenciaIMG_oferente && usuario.referenciaIMG_oferente !== "null" && usuario.referenciaIMG_oferente !== "" ? usuario.referenciaIMG_oferente
                    : IMgUser;

                return (
                <div onClick={(e) => VerUser(user.id)} className="User" key={index}>

                    <div className='UserLeft'>
                        <div className='UserIcon'>
                            <img src={IMgUser2} alt="Imagen de usuario" style={{ width: "70px", height: "70px", borderRadius: "50%" }}/>
                            {user.username}
                        </div>
                    </div>

                    <div className='UserRight'>
                        <p>Fecha de registro</p>
                        {new Date(user.date_joined).toLocaleString()}
                    </div>
                </div>
                );
            })}
        </div>

    )}

    {ContVerUser && (
        <main>
            {!Editando ? (
                // VISTA NORMAL       
                DatosIntermedios.map((dato, index) => {
                
                    const user = Users.find((u) => u.id == idUser && u.id == dato.user);
                    const usuario = Usuarios.find((us) => us.id == IDusuario && us.id == dato.usuario);
                    
                    if (!user || !usuario) return null;
    
                    const IMgUser2 = usuario.referenciaIMG_oferente && usuario.referenciaIMG_oferente !== "null" && usuario.referenciaIMG_oferente !== "" ? usuario.referenciaIMG_oferente
                        : IMgUser;
                        
                    return (
                        <div key={{index}} id='PerfilUser'>
                            <div className='itemPerfil SubContPerfilAdmin1'>
                                <svg onClick={volver} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                                </svg>

                                <div align="center">
                                    <img src={IMgUser2} alt="" />
                                </div>
                                <br />

                                <div style={{ width: "80%", margin: "0 auto" }}>
                                    <label>Identificación</label>
                                    <p>{usuario.identificacion_oferente}</p>

                                    <label>Nombre completo</label>
                                    <p>{user.first_name} {user.last_name}</p>
                                </div>

                            </div>
    
                            <div className='itemPerfil SubContPerfilAdmin2'>
                                <label>Usuario</label>
                                <p>{user.username}</p>        

                                <label>Teléfono</label>
                                <p>{usuario.telefono_oferente}</p>

                                <label>Correo Electrónico</label>
                                <p>{user.email}</p>

                                {DatosGroups.map((group, indexG) => group.id == user.groups[0] && (
                                        <div key={indexG}>                                        
                                        <label>Rol de usuario</label>
                                        <p>{group.name}</p>
                                    </div>
                                ))}
                                <br />

                                <div className='contbtnAcciones' style={{ textAlign: "right", width: "80%" }}>

                                    <button className='BtnEditar' onClick={(e) => EditarPerfil()} >Editar</button>

                                    {IsActivo && (
                                        <button className='boton-desactivar' onClick={(e) => DesactivarUsuario()} >Desactivar</button>
                                    )}

                                    {!IsActivo && (
                                        <button className='boton-activar' onClick={(e) => ActivarUsuario()} >Activar</button>
                                    )}

                                    <button className='boton-eliminar' onClick={(e) => EliminarUsuario()} >Eliminar</button>
                                </div>

                            </div>
                        </div>
                    );
                    
            })

            ) : (
                // MODO EDICIÓN

                        <div id='PerfilUser'>
                            <div className='itemPerfil SubContPerfilAdmin1'>
                                
                                <svg onClick={() => setEditando(false)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                                </svg>
                                <br />

                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                                    {!VistaIMG ? (
                                        <label htmlFor="imageInput" style={{position: "relative", width: "150px", height: "150px", borderRadius: "50%", border: "solid" ,display: "flex",justifyContent:"center", 
                                            alignItems: "center",cursor: "pointer",fontSize: "14px",color: "#666"}}> 
                                            

                                            <img className='ImgEdit' src={IMgUser} alt="" />

                                            <button onClick={(e) => InsertIMGDefault(e)} className='btnEquiz' style={{ position: "absolute", top: "-5px", right: "5px", background: "transparent", color: "white", fontWeight: "bolder", border: "none", borderRadius: "50%", width: "25px", height: "25px", cursor: "pointer"}}> ❌ </button>

                                            <input id="imageInput" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => CambioImagen(e)} />
                                        </label>

                                    
                                    ) : (

                                        <div style={{ position: "relative" }}>

                                        <img src={VistaIMG} className='VistaIMG' alt="Vista previa" style={{ width: "150px", height: "150px", borderRadius: "50%", border: "solid", objectFit: "cover" }} />

                                        <button onClick={manejarEliminarImagen} className='btnEquiz' style={{ position: "absolute", top: "-5px", right: "5px", background: "transparent", color: "white", fontWeight: "bolder", border: "none", borderRadius: "50%", width: "25px", height: "25px", cursor: "pointer"}}> ❌ </button>
                                        </div>
                                    )}

                                <br />
                                </div>

                                <div style={{ width: "80%", margin: "0 auto" }}>
                                    <label>Contraseña Admin</label>
                                    <input value={ContraAdmin} onChange={(e) => setContraAdmin(e.target.value)} className='inputEdit' type="password"/>
                                </div>

                            </div>
    
                            <div className='itemPerfil SubContPerfilAdmin2'>
                                <label> Nuevo Usuario</label><br />
                                <input value={UsuarioAEditar} onChange={(e) => setUsuarioAEditar(e.target.value)} className='inputEdit' type="text" /><br />

                                <label> Nuevo Teléfono</label><br />
                                <input value={TelefonoAEditar} onChange={(e) => setTelefonoAEditar(e.target.value)} className='inputEdit' type="text"/><br />
    
                                <label>Nuevo Correo Electrónico</label><br />
                                <input value={CorreoAEditar} onChange={(e) => setCorreoAEditar(e.target.value)} className='inputEdit' type="text"/><br />
                                <br /><br />

                                <div className='contbtnEditar' style={{ textAlign: "right", width: "80%" }}>
                                    <button onClick={GuardarCambios}> Guardar cambios</button>
                                </div>
                            </div>
                        </div>

            )}
        </main>
    )}


    </div>
  );
}

export default UserRegi;
