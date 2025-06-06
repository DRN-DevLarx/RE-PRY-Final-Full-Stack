import React from 'react'
import NavComponent from '../components/NavComponent'
import Notificaciones from '../components/Notificaciones'
import Ofertas from '../components/Ofertas'
import Footer from '../components/Footer'
import PerfilUsuario from "../components/PerfilUsuario";
function Oferentepage() {
  return (
    <div>
      <NavComponent/>
      <Notificaciones/>
      <PerfilUsuario/>
      <Ofertas/>
      <Footer/>
    </div>
  )
}

export default Oferentepage
