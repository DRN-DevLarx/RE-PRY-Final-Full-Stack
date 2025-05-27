import { useState, useEffect } from "react";
import  "../styles/RegisterEmpresas.css";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import InteresesServices from '../services/interesesServices';
import UsuariosServices from "../services/UsuariosServices"


function RegisterForm2() {

  const [Identificacion, setIdentificacion] = useState('');
  const [ConfirmacionID, setConfirmacionID] = useState('');
  const navigate = useNavigate();
  const [intereses, setIntereses] = useState([]);




  function exit() {
    setTimeout(() => {
        navigate('/')            
    }, 200);
  }

  return (
    <div id='bodyRegisterEmpresas'>
      <div id='contRegisterEmpresas'>
        <header>
          <svg onClick={exit} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </header>
        <h1>Registrar</h1>

        <div id='btnsRegisterEmpresas'>
          <button className='btnROferente'> <Link className="LinkRegister" to="/register1">Persona oferente</Link> </button>
          <button className='btnREmpresa'> <Link className="LinkRegister" to="/register2">Empresa</Link></button>
        </div>

        <label htmlFor=""> <span>*</span> Identificación</label><br />
        <input className="inputs1Empresas" type="number" value={Identificacion} onChange={(e) => setIdentificacion(e.target.value)}/><br /><br />

        <label htmlFor=""> <span>*</span> Confirmar Identificación</label><br />
        <input className="inputs1Empresas" type="number" value={ConfirmacionID} onChange={(e) => setConfirmacionID(e.target.value)} />
        

        <div className='DIVbtnREmpresa'>
          <button className='btnNextRegisterEmpresas'>Siguiente</button>
        </div>

        <br />
        <p align="center" className='pRREmpresas'>¿Ya tienes una cuenta?, <Link className='LINK' to="/login"> Iniciar sesión</Link></p>
      </div>
    </div>
  )
}

export default RegisterForm2