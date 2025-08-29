import React from 'react'
import {useNavigate} from "react-router-dom"
import "../styles/BotonesAdmin.css"
import { VerificarToken } from "../services/Token/fetchAuth";

function BotonesAdmin() {
  const navigate = useNavigate()

  async function IrDashboar() {
    await VerificarToken();
      navigate("/dashboard");
  }

  async function IrPublicar() {
    await VerificarToken();
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
