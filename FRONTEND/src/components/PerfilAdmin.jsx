import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Users_UsuariosServices from '../services/Users_UsuariosServices';
import usersServices from '../services/usersServices';
import usuariosServices from '../services/usuariosServices';
import GetCookie from '../services/GetCookie';
import '../styles/PerfilAdmin.css'
import { CerrarDashboard } from './CerrarDashboard';

    function PerfilAdmin() {
        const navigate = useNavigate();
        const [isEditing, setIsEditing] = useState(false);

        let IMgUser = "https://res.cloudinary.com/dw65xvmgp/image/upload/v1749743238/FB_chiuol.avif"

        // Estado del perfil
        const [perfil, setPerfil] = useState({
            nombre: "Darien",
            apellido: "Aguilar",
            identificacion: "604750941",
            telefono: "63746352",
            correo: "darienaguiar3000@gmail.com"
        });
        
        const IDUser = GetCookie.getCookie("user_id")

        
        const [DatosIntermedios, setDatosIntermedios] = useState([])
        const [Users, setUsers] = useState([])
        const [Usuarios, setUsuarios] = useState([])
        
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
        
        const IDusuario = DatosIntermedios.find(item => item.user == IDUser)?.usuario;

        
        Usuarios.find((user) => {
            if(user.referenciaIMG_oferente != "") {
                IMgUser = user.referenciaIMG_oferente
            }
        })

        const [editPerfil, setEditPerfil] = useState(perfil);

        function exitDashboard() {
            CerrarDashboard(navigate)
        }




        function EditarPerfil() {
            setEditPerfil(perfil); // Cargar datos actuales al iniciar edición
            setIsEditing(true);
        }

        function GuardarCambios() {
            setPerfil(editPerfil); // Guardar datos editados
            setIsEditing(false);
        }

    


        return (
            <div id='ContPerfilAdmin'>
                <div className='headerPerfilAdmin'>
                    <h3>Perfil de Administrador</h3>
                    <svg onClick={exitDashboard} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
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
                                            <input className='inputEdit' type="password" placeholder='contraseña atual' />

                                            <label>Nueva contraseña</label>
                                            <input className='inputEdit' type="password" placeholder='Nueva contraseña' />
                                            
                                        </div>
                                    </div>
            
                                    <div className='itemPerfil SubContPerfilAdmin2'>
                                        <label>Usuario</label><br />
                                        <input className='inputEdit' type="text" placeholder={useer.username}/><br />

                                        <label>Teléfono</label><br />
                                        <input className='inputEdit' type="text" placeholder={usuario.telefono_oferente}/><br />
            
                                        <label>Correo Electrónico</label><br />
                                        <input className='inputEdit' type="text" placeholder={useer.email}/><br />
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
