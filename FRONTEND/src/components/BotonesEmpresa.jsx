import React from 'react'
import "../styles/BtnAdmin.css"
import {useNavigate} from "react-router-dom"

function BotonesEmpresa() {
  const navigate = useNavigate()

  function IrPublicar() {
      navigate("/public");
  }


  return (
    <div>
      <div className="contBtnsActiones">
        <button onClick={IrPublicar}> Publicar </button>
      </div>
    </div>
  )
}

export default BotonesEmpresa
