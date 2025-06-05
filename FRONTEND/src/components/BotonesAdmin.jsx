import React from 'react'
import "../styles/BtnAdmin.css"

function BotonesAdmin() {

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
