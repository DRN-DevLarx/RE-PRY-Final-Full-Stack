import React from 'react'
import  "../styles/Register.css";


function RegisterForm2() {
  return (
    <div id='bodyRegister'>
          <div className='cont'>
            <h1 className='reg'>Registrar</h1><br /><br />
            <div className='Btnq'>
              <button>Persona Oferente</button>
              <button className='Btnq'>Empresa</button>
            </div><br />
            <label htmlFor="">Nombre</label>
            <input type="text"/>
            <label htmlFor="">Email</label>
            <input type="text" />
            <label htmlFor="">Username</label>
            <input type="text" />
            <label htmlFor="">Pasword</label>
            <input type="text" />

            <button>Registrarse</button>
          </div>
    </div>
  )
}

export default RegisterForm2