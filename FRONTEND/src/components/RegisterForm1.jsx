import React from 'react'
import  "../styles/Register.css";
import { useNavigate } from 'react-router-dom';


function RegisterForm1() {

  const navigate = useNavigate()

  function exit() {
    setTimeout(() => {
        navigate('/')            
    }, 200);

  }

  return (
    <div id='bodyRegister'>
      <div id='cont'>
        <header>
          <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </header>
        <h1>Registrar</h1>

        <div id='btnsRegister'>
          <button className='btnROferente'>Persona oferente</button>
          <button className='btnREmpresa'>Empresa</button>
        </div>

        <label htmlFor=""> <span>*</span> Identificación</label><br />
        <input type="number" /><br /><br />

        <label htmlFor=""> <span>*</span> Confirmar Identificación</label><br />
        <input type="number" />
        
        <div className='DIVbtnR'>
          <button className='btnNextRegister'>Siguiente</button>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm1