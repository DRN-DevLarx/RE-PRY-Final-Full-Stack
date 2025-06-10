import React, { useState } from 'react'
import '../styles/PerfilAdmin.css'
import { useNavigate } from 'react-router-dom';

function PerfilAdmin() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    // Estado del perfil
    const [perfil, setPerfil] = useState({
        nombre: "Darien",
        apellido: "Aguilar",
        acerca: "Administrador de la plataforma",
        identificacion: "604750941",
        telefono: "63746352",
        correo: "darienaguiar3000@gmail.com"
    });

    const [editPerfil, setEditPerfil] = useState(perfil);

    function exitDashboard() {
        navigate("/PrincipalPage")
    }

    function handleEditar() {
        setEditPerfil(perfil); // Cargar datos actuales al iniciar edición
        setIsEditing(true);
    }

    function handleGuardar() {
        setPerfil(editPerfil); // Guardar datos editados
        setIsEditing(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEditPerfil(prev => ({ ...prev, [name]: value }));
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
                    <div id='PerfilAdmin'>
                        <div className='itemPerfil SubContPerfilAdmin1'>
                            <div align="center">
                                <img src="/public/Iconlogo.png" alt="" />
                            </div>
                            <br />
                            <div style={{ width: "80%", margin: "0 auto" }}>
                                <label>Nombre completo</label>
                                <p>{perfil.nombre} {perfil.apellido}</p>

                                <label>Acerca de mi</label>
                                <p>{perfil.acerca}</p>
                            </div>
                        </div>

                        <div className='itemPerfil SubContPerfilAdmin2'>
                            <label>Identificación</label>
                            <p>{perfil.identificacion}</p>

                            <label>Teléfono</label>
                            <p>{perfil.telefono}</p>

                            <label>Correo Electrónico</label>
                            <p>{perfil.correo}</p>
                            <br /><br />
                            <div className='contbtnEditar' style={{ textAlign: "right", width: "80%" }}>
                                <button onClick={handleEditar}>Editar perfil</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // MODO EDICIÓN
                    <div id='PerfilAdmin'>
                        <div className='itemPerfil SubContPerfilAdmin1'>
                            <div align="center">
                                <img src="/public/Iconlogo.png" alt="" />
                            </div>
                            <br />
                            <div style={{ width: "80%", margin: "0 auto" }}>
                                <label>Nombre</label>
                                <input className='inputEdit' type="text" name="nombre" value={editPerfil.nombre} onChange={handleChange} /><br /><br />

                                <label>Apellido</label>
                                <input className='inputEdit' type="text" name="apellido" value={editPerfil.apellido} onChange={handleChange} /><br /><br />

                                <label>Acerca de mi</label><br /><br />
                                <textarea className='textTareaEdit' rows={3} name="acerca" value={editPerfil.acerca} onChange={handleChange}></textarea>
                            </div>
                        </div>

                        <div className='itemPerfil SubContPerfilAdmin2'>
                            <label>Identificación</label><br />
                            <input className='inputEdit' type="text" name="identificacion" value={editPerfil.identificacion} onChange={handleChange} /><br /><br />

                            <label>Teléfono</label><br />
                            <input className='inputEdit' type="text" name="telefono" value={editPerfil.telefono} onChange={handleChange} /><br /><br />

                            <label>Correo Electrónico</label><br />
                            <input className='inputEdit' type="email" name="correo" value={editPerfil.correo} onChange={handleChange} /><br /><br /><br />

                            <div className='contbtnEditar' style={{ textAlign: "right", width: "80%" }}>
                                <button onClick={handleGuardar}>Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default PerfilAdmin
