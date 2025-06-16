import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Users_UsuariosServices from '../services/Users_UsuariosServices';
import usersServices from '../services/usersServices';
import usuariosServices from '../services/usuariosServices';
import GetCookie from '../services/GetCookie';

import { CerrarDashboard } from './CerrarDashboard';
import Swal from 'sweetalert2';

import '../styles/PerfilAdmin.css'

function PerfilAdmin() {
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
            try {
                const datosIntermedios = await Users_UsuariosServices.GetUserUsuario();
                
                if (datosIntermedios.length > 0) {
                    const userIds = datosIntermedios.map(item => item.user);
                    const usuarioIds = datosIntermedios.map(item => item.usuario);
                    
                    const datosUsers = await usersServices.GetUsersByIds(userIds);
                    const datosUsuarios = await usuariosServices.GetUsuariosByIds(usuarioIds);
                    
                    
                    if (isMounted) {
                        setUsers(datosUsers);
                        setUsuarios(datosUsuarios);
                        setDatosIntermedios(datosIntermedios);
                    }
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
        
        return () => {
            isMounted = false;
        };
    }, []);
    
    let IMgUser = "https://res.cloudinary.com/dw65xvmgp/image/upload/v1749743238/FB_chiuol.avif"
    
    const [isEditing, setIsEditing] = useState(false);
    const IDUser = GetCookie.getCookie("user_id")
    
    const [DatosIntermedios, setDatosIntermedios] = useState([])
    const [Users, setUsers] = useState([])
    const [Usuarios, setUsuarios] = useState([])
    
    const [ContrasenaActual, setContrasenaActual] = useState("")

    const [UsuarioAEditar, setUsuarioAEditar] = useState("")
    const [TelefonoAEditar, setTelefonoAEditar] = useState("")
    const [CorreoAEditar, setCorreoAEditar] = useState("")

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
    
    const IDusuario = DatosIntermedios.find(item => item.user == IDUser)?.usuario;

    
    Usuarios.find((user) => {
        if(user.referenciaIMG_oferente != "") {
            IMgUser = user.referenciaIMG_oferente
        }
    })

                console.log(Users);

    function exitDashboard() {
        CerrarDashboard(navigate)
    }

    function EditarPerfil() {
        setIsEditing(true);
    }

    
    async function GuardarCambios() {
        
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
                text: "El usuario debe contener 5 carácteres mínimo.",
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

            
            if (Users.some(user => user.email == correo)) {
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
            const UsernameFind = UserFind.username;
    
            const credentials = {
                username: UsernameFind,
                password: ContrasenaActual,
            };      
    
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            });
    
            const data = await response.json();
                            
            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    text: "La contraseña es incorrecta. Porfavor intenta nuevamente",
                    background: "#1a1a1a",
                    color: "#ffffff",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        }


        const ejecutarValidaciones = () => {
          const datosUsuario = [ContrasenaActual, UsuarioAEditar, TelefonoAEditar, CorreoAEditar];
        
          if (
            validarCampos(ContrasenaActual, UsuarioAEditar, TelefonoAEditar, CorreoAEditar) &&
            validarUsuario(UsuarioAEditar) &&
            validarTelefono(TelefonoAEditar) &&
            validarSimbolos(UsuarioAEditar) &&
            validarCorreo(CorreoAEditar, Users) &&
            ValidarContrasena(ContrasenaActual) &&
            validarPalabrasProhibidas(datosUsuario)
          ) {
            
            ActualizarDatos()
            
          }
        };
        
        ejecutarValidaciones();
    

    }

    function ActualizarDatos() {
        



    }


    return (
        <div id='ContPerfilAdmin'>
            <div className='headerPerfilAdmin'>
                <h3>Perfil</h3>
                <svg onClick={exitDashboard} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
            </div>

            <main>
                {!isEditing ? (
                    // VISTA NORMAL

                    Users.map((useer, index) => (useer.id == IDUser && (
                        Usuarios.filter(usuaario => usuaario.id == IDusuario).map((usuario, index2) => (
                    
                            <div key={`${index}${index2}`} id='PerfilAdmin'>
                                <div className='itemPerfil SubContPerfilAdmin1'>
                                    <div align="center">
                                        <img src={IMgUser} alt="" />
                                    </div>
                                    <br />
                                    <div style={{ width: "80%", margin: "0 auto" }}>
                                    
                                        <label>Identificación</label>
                                        <p>{usuario.identificacion_oferente}</p>

                                        <label>Nombre completo</label>
                                        <p>{useer.first_name} {useer.last_name}</p>
        
                                    </div>
                                </div>
        
                                <div className='itemPerfil SubContPerfilAdmin2'>
                                    <label>Usuario</label>
                                    <p>{useer.username}</p>        

                                    <label>Teléfono</label>
                                    <p>{usuario.telefono_oferente}</p>
        
                                    <label>Correo Electrónico</label>
                                    <p>{useer.email}</p>
                                    <br /><br />
                                    <div className='contbtnEditar' style={{ textAlign: "right", width: "80%" }}>
                                        <button onClick={EditarPerfil}>Editar perfil</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )))

                ) : (
                    // MODO EDICIÓN
                    Users.map((useer, index) => (useer.id == IDUser && (
                        Usuarios.filter(usuaario => usuaario.id == IDusuario).map((usuario, index2) => (
                    
                            <div key={`${index}${index2}`} id='PerfilAdmin'>
                                <div className='itemPerfil SubContPerfilAdmin1'>
                                    <div align="center">
                                        <img src={IMgUser} alt="" />
                                    </div>
                                    <br />
                                    <div style={{ width: "80%", margin: "0 auto" }}>
                                    
                                        <label>Contraseña actual</label>
                                        <input value={ContrasenaActual} onChange={(e) => setContrasenaActual(e.target.value)} className='inputEdit' type="password" placeholder='contraseña actual' />

                                    </div>
                                </div>
        
                                <div className='itemPerfil SubContPerfilAdmin2'>
                                    <label>Usuario</label><br />
                                    <input value={UsuarioAEditar} onChange={(e) => setUsuarioAEditar(e.target.value)} className='inputEdit' type="text" placeholder={useer.username}/><br />

                                    <label>Teléfono</label><br />
                                    <input value={TelefonoAEditar} onChange={(e) => setTelefonoAEditar(e.target.value)} className='inputEdit' type="text" placeholder={usuario.telefono_oferente}/><br />
        
                                    <label>Correo Electrónico</label><br />
                                    <input value={CorreoAEditar} onChange={(e) => setCorreoAEditar(e.target.value)} className='inputEdit' type="text" placeholder={useer.email}/><br />
                                    <br /><br />

                                    <div className='contbtnEditar' style={{ textAlign: "right", width: "80%" }}>
                                        <button onClick={GuardarCambios}> Guardar cambios</button>
                                    </div>

                                </div>
                            </div>
                        ))
                    )))
                )}
            </main>
        </div>
    )
}

export default PerfilAdmin
