import React from 'react'
import { v4 } from 'uuid';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import GetCookie from '../services/GetCookie';

import '../styles/CYS.css'

function CYS() {

    const navigate = useNavigate();

    const [Nombre, setNombre] = React.useState('');
    const [Apellido, setApellido] = React.useState('');
    const [Correo, setCorreo] = React.useState('');
    const [Telefono, setTelefono] = React.useState('');
    const [Asunto, setAsunto] = React.useState('');
    const [Mensaje, setMensaje] = React.useState('');

    let cysID = GetCookie.getCookie('formUserId');

    function exit() {
        setTimeout(() => {
            navigate('/')            
        }, 200);
    }

    useEffect(() => {   
    const cysID = GetCookie.getCookie('formUserId');

    if (!cysID) {
        cysID = v4();

        document.cookie = `formUserId=${cysID}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    }
    }, []);


    function EnviarMensaje() {
        if (!Nombre || !Apellido || !Correo || !Telefono || !Asunto || !Mensaje) {
            alert('Por favor completa todos los campos');
            return;
        }


        const data = {
            id: cysID,
            Nombre,
            Apellido,
            Correo,
            Telefono,
            Asunto,
            Mensaje
        };

    }


  return (
    <div id='bodyCYS'>
        <header id='headerCYS'>
            <div>
          <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
          </svg><br /><br />
                <h2>Contacto y soporte</h2>
                <p>Por favor completa tu información </p>
            </div>
        </header>

        <main id='mainCYS'>
            <div id='subMainCYS'>
                <div id='form'>
                    <input value={Nombre} onChange={(e) => setNombre(e.target.value)} type="text" placeholder='Nombre'/>

                    <input value={Apellido} onChange={(e) => setApellido(e.target.value)} type="text" placeholder='Apellido' />

                    <input value={Correo} onChange={(e) => setCorreo(e.target.value)} type="text" placeholder='Correo electrónico' />

                    <input value={Telefono} onChange={(e) => setTelefono(e.target.value)} type="text" placeholder='Telefóno' />

                    <input value={Asunto} onChange={(e) => setAsunto(e.target.value)} type="text" placeholder='Asunto' />
                    
                    <textarea value={Mensaje} onChange={(e) => setMensaje(e.target.value)} rows={4} name="" id="" placeholder='Mensaje'></textarea>

                    <button onClick={EnviarMensaje} >Enviar</button>
                </div>

                <div id='IMG'>
                    <img src="/CYSIMG.svg" alt="" width={400} />
                </div>
            </div>

        </main>
        


    </div>
  )
}

export default CYS
