import React from 'react'
import "../styles/BtnAdmin.css"
import {useNavigate} from "react-router-dom"

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
            <div>
        <div className="contBtnsActiones">
          <button onClick={IrDashboar}> Administrar </button>
          <button onClick={IrPublicar}> Publicar </button>
        </div>
      </div>
    </div>
  )
}

export default BotonesAdmin
