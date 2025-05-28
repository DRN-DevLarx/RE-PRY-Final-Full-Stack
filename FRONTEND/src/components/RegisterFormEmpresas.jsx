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

  function volver() {
    setTimeout(() => {
        navigate("/")            
    }, 200);
  }
  
  function ROferente() {
    navigate('/register1')
  }

  function REmpresa () {
    navigate('/registrarEmpresa')
  }

  return (
    <div id='bodyRegisterEmpresas'>
      <div id='contRegisterEmpresas'>
        <header>
          <svg onClick={volver} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
          </svg>
        </header>
        <h1>Registrar</h1>

        <div id='btnsRegisterEmpresas'>
          <button onClick={ROferente} className='btnROferenteE'> Persona oferente </button>
          <button onClick={REmpresa} className='btnREmpresa'> Empresa </button>
        </div>

        <label htmlFor=""> <span>*</span> Identificación</label><br />
        <input className="inputs1Empresas" type="number" value={Identificacion} onChange={(e) => setIdentificacion(e.target.value)}/><br /><br />

        <label htmlFor=""> <span>*</span> Confirmar Identificación</label><br />
        <input className="inputs1Empresas" type="number" value={ConfirmacionID} onChange={(e) => setConfirmacionID(e.target.value)} />
        

        <div className='DIVbtnREmpresa'>
          <button className='btnNextRegisterEmpresas'>Siguiente</button>
        </div>

        <br />
        <p align="center" className='pRR'>¿Ya tienes una cuenta?, <Link className='LINK' to="/login"> Iniciar sesión</Link></p>
      </div>
    </div>
  )
}

export default RegisterForm2