import React from 'react'
import '../styles/CYS.css'
import { useNavigate } from 'react-router-dom'

function CYS() {

    const navigate = useNavigate();

    function exit() {
        setTimeout(() => {
            navigate('/')            
        }, 200);

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
                    <input type="text" placeholder='Nombre'/>

                    <input type="text" placeholder='Apellido' />

                    <input type="text" placeholder='Correo electrónico' />

                    <input type="text" placeholder='Telefóno' />

                    <input type="text" placeholder='Asunto' />
                    <textarea rows={4} name="" id="" placeholder='Mensaje'></textarea>

                    <footer>
                        <button>Enviar</button>
                    </footer>
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
