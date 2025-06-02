import React, { useState } from 'react'
import '../styles/PerfilAdmin.css'
import { useNavigate } from 'react-router-dom';

function PerfilAdmin() {
    
    const navigate = useNavigate();


    function exitDashboard() {
        navigate("/admin")
    }

  return (

    <div id='ContPerfilAdmin'>
        <div className='headerPerfilAdmin'>
            <h3>Perfil de Administrador</h3>
            <svg onClick={exitDashboard} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>
        </div>
 
        <main>
            <div id='PerfilAdmin'>

                <div className='itemPerfil SubContPerfilAdmin1'>
                    <div align="center">
                        <img src="/public/Iconlogo.png" alt="" />
                    </div>
                    <br />
                    
                    <div style={{width: "80%", margin: "0 auto"}}>
                        <label htmlFor="">Nombre completo</label>
                        <p>Darien</p>

                        <label htmlFor="">Acerca de mi</label>
                        <p>Administrador de la plataforma</p>
                    </div>

                </div>



                <div className='itemPerfil SubContPerfilAdmin2'>
                    <label htmlFor="">Identificación</label>
                    <p>604750941</p>

                    <label htmlFor="">Teléfono</label>
                    <p>63746352</p>

                    <label htmlFor="">Correo Electrónico</label>
                    <p>darienaguiar3000@gmail.com</p>
                    <br /><br />

                    <div className='contbtnEditar' style={{textAlign: "right", width:"80%"}}>
                        <button>Editar perfil</button>
                    </div>
                </div>


            </div>

            <div id='PerfilAdmin'>

                <div className='itemPerfil SubContPerfilAdmin1'>
                    <div align="center">
                        <img src="/public/Iconlogo.png" alt="" />
                    </div>
                    <br />
                    
                    <div style={{width: "80%", margin: "0 auto"}}>
                        <label htmlFor="">Nombre</label>
                        <input className='inputEdit inputEditNom' type="text" placeholder='Darien' /><br /><br />

                        <label htmlFor="">Apellido</label>
                        <input className='inputEdit inputEditNom' type="text" placeholder='Aguilar' /><br /><br />

                        <label htmlFor="">Acerca de mi</label><br />
                        <textarea className='textTareaEdit' rows={3} cols={35}name="" id=""placeholder='Administrador de la plataforma' ></textarea>
                    </div>

                </div>



                <div className='itemPerfil SubContPerfilAdmin2'>
                    <label htmlFor="">Identificación</label><br />
                    <input className='inputEdit' type="number" placeholder='604750941' /><br /><br />

                    <label htmlFor="">Teléfono</label><br />
                    <input className='inputEdit' type="number" placeholder='63746352' /><br /><br />

                    <label htmlFor="">Correo Electrónico</label><br />
                    <input className='inputEdit' type="text" placeholder='darienaguiar3000@gmail.com' />
                    <br /><br /><br />

                    <div className='contbtnEditar' style={{textAlign: "right", width:"80%"}}>
                        <button>Guardar cambios</button>
                    </div>
                </div>


            </div>
        </main>
    </div>
  )
}

export default PerfilAdmin
