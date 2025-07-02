import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Users_UsuariosServices from '../services/Users_UsuariosServices';
import usersServices from '../services/usersServices';
import usuariosServices from '../services/usuariosServices';
import empresasServices from '../services/empresasServices';

import { CerrarDashboard } from './CerrarDashboard';

import GetCookie from '../services/GetCookie';
import cloudDinaryServices from '../services/cloudDinaryServices';
import Swal from 'sweetalert2';

import '../styles/PerfilAdmin.css'
import Users_EmpresasServices from '../services/Users_EmpresasServices';

function PerfilAdmin() {
    const navigate = useNavigate();

    let IMgUser = "https://res.cloudinary.com/dateuzds4/image/upload/v1750454292/FB_sby2fv.avif"
    
    const [isEditing, setIsEditing] = useState(false);
    
    const [DatosIntermediosUsuarios, setDatosIntermediosUsuarios] = useState([])
    const [DatosIntermediosEmpresas, setDatosIntermediosEmpresas] = useState([])
    const [Users, setUsers] = useState([])
    const [Usuarios, setUsuarios] = useState([])
    const [Empresas, setEmpresas] = useState([])
    


    const [Identificacion, setIdentificacion] = useState("")
    const [ContrasenaActual, setContrasenaActual] = useState("")
    const [UsuarioAEditar, setUsuarioAEditar] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [TelefonoAEditar, setTelefonoAEditar] = useState("")
    const [CorreoAEditar, setCorreoAEditar] = useState("")


    const Rol = GetCookie.getCookie("role")
    const IDUser = GetCookie.getCookie("user_id")



    const [IDusuario, setIDusuario] = useState();
    const [IDempresa, setIDempresa] = useState();
    
    const [ImagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [VistaIMG, setVistaIMG] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const datosIntermediosUsuarios = await Users_UsuariosServices.GetUserUsuario();
                const datosIntermediosEmpresa = await Users_EmpresasServices.GetUserEmpresa();
                
                if (datosIntermediosUsuarios.length > 0) {
                    const userIds = datosIntermediosUsuarios.map(item => item.user);
                    const usuarioIds = datosIntermediosUsuarios.map(item => item.usuario);
                    const empresaIds = datosIntermediosEmpresa.map(item => item.empresa);                    
      
                    const datosUsers = await usersServices.GetUser();
                    const datosUsersIDS = await usersServices.GetUsersByIds(userIds);
                    const datosUsuarios = await usuariosServices.GetUsuariosByIds(usuarioIds);
                    const datosEmpresas = await empresasServices.GetEmpresaByIds(empresaIds);
                                        
                    
                    if (datosUsersIDS && datosUsuarios && datosEmpresas) {
                        setUsers(datosUsers);
                        setUsuarios(datosUsuarios);
                        setEmpresas(datosEmpresas);

                        setDatosIntermediosUsuarios(datosIntermediosUsuarios);
                        setDatosIntermediosEmpresas(datosIntermediosEmpresa);
                    }
                                        
                    const IDusuario = datosIntermediosUsuarios.find(item => item.user == IDUser)?.usuario;
                    setIDusuario(IDusuario)
                    
                    const IDempresa = datosIntermediosEmpresa.find(item => item.user == IDUser)?.empresa;
                    setIDempresa(IDempresa)
                    
                    
                    if(Rol == "admin") {
                        datosUsuarios.filter((usu) => (usu.id == IDusuario && (
                            setIdentificacion(usu.identificacion_oferente),
                            setTelefonoAEditar(usu.telefono_oferente)
                        )))
                    }
                    else {
                        datosEmpresas.filter((usu) => (usu.id == IDempresa && (
                            setIdentificacion(usu.identificacion_empresa),
                            setTelefonoAEditar(usu.telefono_empresa)
                        )))
                    }
                    
                    datosUsers.filter((useer) => (useer.id == IDUser && (                        
                        setUsuarioAEditar(useer.username),
                        setFirstName(useer.first_name),
                        setLastName(useer.last_name),
                        setCorreoAEditar(useer.email)
                    )))
               
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
        
    }, []);
    

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

    if(Rol === "admin") {

        Usuarios.filter((user) => {
                    
            if(user.id == IDusuario && user.referenciaIMG_oferente != "" && user.referenciaIMG_oferente != "null" && user.referenciaIMG_oferente != null) {
                IMgUser = user.referenciaIMG_oferente
            }
        })
    } else {

        Empresas.filter((empresa) => {
                    
            if(empresa.id == IDempresa && empresa.referenciaIMG_empresa != "" && empresa.referenciaIMG_empresa != "null" && empresa.referenciaIMG_empresa != null) {
                IMgUser = empresa.referenciaIMG_empresa
            }
        })
    }


    function exitDashboard() {
        CerrarDashboard(navigate)
    }

    function EditarPerfil() {
        
        setIsEditing(true);

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

    const validarCampos = (ContrasenaActual, UsuarioAEditar, TelefonoAEditar, CorreoAEditar) => {
        if (![ContrasenaActual, , UsuarioAEditar, TelefonoAEditar, CorreoAEditar].every(campo => campo.trim() !== "")) {
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

    if (Usuarios.some((user) => user.username === UsuarioAEditar)) {
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
    const prefijosCostaRica = [5, 8, 7, 6, 57, 21, 22, 24, 25, 26, 27];

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
        
        const UsuarioEncontrado = Users.find((UsFind) => UsFind.id == IDUser)
        
        if (Users.some(user => user.email == correo && user != UsuarioEncontrado)) {
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
    
    async function ValidarContrasena(ContrasenaActual) {

        const UserFind = Users.find(user => user.id == IDUser);
        
        const UsernameFind = UserFind.username

        const credentials = {
            username: UsernameFind,
            password: ContrasenaActual,
        }; 

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
        const datosUsuario = [ContrasenaActual, UsuarioAEditar, TelefonoAEditar, CorreoAEditar];

        if (
            validarCampos(ContrasenaActual, UsuarioAEditar, TelefonoAEditar, CorreoAEditar) &&
            validarUsuario(UsuarioAEditar) &&
            validarTelefono(TelefonoAEditar) &&
            validarSimbolos(UsuarioAEditar) &&
            validarCorreo(CorreoAEditar, Users) &&
            validarPalabrasProhibidas(datosUsuario)
        ) {

            const esContrasenaCorrecta = await ValidarContrasena(ContrasenaActual);

            if (esContrasenaCorrecta) {
                Swal.fire({
                    icon: "info",
                    title: "Crear nueva contraseña",
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
                        ActualizarDatos(result.value[0]);
                    }
                });

            }
        }
    }
 
    async function GuardarCambios() {

        ejecutarValidaciones();

    }

    async function ActualizarDatos(NuevaContraseña) {

        console.log(UsuarioAEditar);
        
        const UpdateData = {
            password: NuevaContraseña,
            username: UsuarioAEditar,
            email: CorreoAEditar,
        }
        
        const respuestaUpdateData = await usersServices.PutUserPatch(IDUser, UpdateData);
        
        console.log(respuestaUpdateData);
        
        if(respuestaUpdateData) {

            let respuestaServer = false;

            const uploadedUrl = await cloudDinaryServices.uploadImage(ImagenSeleccionada);

            console.log(uploadedUrl);
            
            if(Rol == "admin") {
                const UpdateUsuarioData = {
                    telefono_oferente: TelefonoAEditar,
                    referenciaIMG_oferente: uploadedUrl,
                }
    
                respuestaServer = await usuariosServices.PutUsuarioPatch(IDusuario, UpdateUsuarioData)
                    

            } else if(Rol == "empresa") {
                const UpdateEmpresaData = {
                    telefono_empresa: TelefonoAEditar,
                    referenciaIMG_empresa: uploadedUrl,
                }   

                console.log("Holaa");
                
                respuestaServer = await empresasServices.PutPachEmpresa(IDempresa, UpdateEmpresaData)
                
            }

            console.log(respuestaServer);
            
            if (respuestaServer) {
                Swal.fire({
                    icon: "success",
                    text: "Registro exitoso.",
                    background: "#1a1a1a",
                    color: "#ffffff",
                    showConfirmButton: false,
                });
            }
        }
        else {
            Swal.fire({
            icon: "error",
            text: "Hubo un problema con el registro.",
            background: "#1a1a1a",
            color: "#ffffff",
            showConfirmButton: true,
            });
        }

    }

    return (
        <div id='ContPerfilAdmin'>
            <div className='headerDashboard'>
                <h3>Perfil</h3>
                <svg onClick={exitDashboard} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
            </div>

            <main>
                {!isEditing ? (

                    <div id='PerfilAdmin'>                                                                

                        <div className='itemPerfil SubContPerfilAdmin1'>
                            <div align="center">
                                <img src={IMgUser} alt="Imagen de usuario" />
                            </div>
                            <br />
                            <div style={{ width: "80%", margin: "0 auto" }}>
                            
                                <label>Identificación</label>
                                <p>{Identificacion}</p>

                                <label>Nombre completo</label>
                                <p>{FirstName} {LastName}</p>

                            </div>
                        </div>

                        <div className='itemPerfil SubContPerfilAdmin2'>
                            <label>Usuario</label>
                            <p>{UsuarioAEditar}</p>        

                            <label>Teléfono</label>
                            <p>{TelefonoAEditar}</p>

                            <label>Correo Electrónico</label>
                            <p>{CorreoAEditar}</p>
                            <br /><br />
                            <div className='contbtnEditar' style={{ textAlign: "right", width: "80%" }}>
                                <button onClick={EditarPerfil}>Editar perfil</button>
                            </div>
                        </div>
                    </div>


                ) : (
                    // MODO EDICIÓN

                            <div id='PerfilAdmin'>
                                <div className='itemPerfil SubContPerfilAdmin1'>

                                    <h5>Selecciona una imagen</h5>
                                    <br />
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                                    {!VistaIMG ? (
                                        <label htmlFor="imageInput" style={{width: "150px", height: "150px", borderRadius: "50%", border: "solid" ,display: "flex",justifyContent:"center", 
                                            alignItems: "center",cursor: "pointer",fontSize: "14px",color: "#666"}}> 
                                            

                                            <img src={IMgUser} alt="" />

                                            <input id="imageInput" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => CambioImagen(e)} /></label>
                                    ) : (

                                        <div style={{ position: "relative" }}>

                                        <img src={VistaIMG} className='VistaIMG' alt="Vista previa" style={{ width: "150px", height: "150px", borderRadius: "50%", border: "solid", objectFit: "cover" }} />

                                        <button onClick={manejarEliminarImagen} className='btnEquiz' style={{ position: "absolute", top: "-5px", right: "5px", background: "transparent", color: "white", fontWeight: "bolder", border: "none", borderRadius: "50%", width: "25px", height: "25px", cursor: "pointer"}}> ❌ </button>
                                        </div>
                                    )}

                                    <br />
                                    </div>

                                    <div style={{ width: "80%", margin: "0 auto" }}>
                                    
                                        <label>Contraseña actual</label>
                                        <input value={ContrasenaActual} onChange={(e) => setContrasenaActual(e.target.value)} className='inputEdit' type="password" placeholder='contraseña actual' />

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
        </div>
    )
}

export default PerfilAdmin
