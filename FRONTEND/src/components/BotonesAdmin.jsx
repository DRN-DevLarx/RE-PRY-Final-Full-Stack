import React from 'react'
import {useNavigate} from "react-router-dom"
import "../styles/BotonesAdmin.css"

function BotonesAdmin() {
  const navigate = useNavigate()

  function IrDashboar() {
      navigate("/dashboard");
  }

  function IrPublicar() {
      navigate("/public");
  }


  return (
    <div>
        <div className="contBtnsActiones">
          <button onClick={IrDashboar}> Administrar </button>
          <button onClick={IrPublicar}> Publicar </button>
        </div>
    </div>
  )
}

export default BotonesAdmin
