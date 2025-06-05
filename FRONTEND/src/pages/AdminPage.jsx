import React from 'react'
import AdminComponent from "../components/AdminComponent"
import NavComponent from '../components/NavComponent'
import Notificaciones from '../components/Notificaciones'
import  PerfilUsuario from '../components/PerfilUsuario' 
import Ofertas from '../components/Ofertas'
import Footer from '../components/Footer'
import BotonesAdmin from '../components/BotonesAdmin'

function AdminPage() {
  return (
    <div>
   
      <NavComponent/>
      <Notificaciones/>
       <PerfilUsuario />
      <BotonesAdmin/>   
      <Ofertas/>
      <Footer/>
       </div>
  )
}

export default AdminPage
