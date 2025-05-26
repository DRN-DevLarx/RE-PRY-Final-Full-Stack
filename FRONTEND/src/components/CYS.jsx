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
                <h2>Contacto y soporte</h2>
                <p>Por favor completa tu información </p>
            </div>

            <div>
                <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
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
