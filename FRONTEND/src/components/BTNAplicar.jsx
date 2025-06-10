import React from 'react'
import "../styles/BTNAplicar.css"
import {useNavigate} from "react-router-dom";
function BTNAplicar() {

      const navigate = useNavigate()


    function exitDashboard() {
        navigate("/ApEmpleo")
    }

  return (
    <div className="boton-Aplicar">
        <button onClick={exitDashboard}> Aplicar</button>

    </div>
  )
}

export default BTNAplicar
