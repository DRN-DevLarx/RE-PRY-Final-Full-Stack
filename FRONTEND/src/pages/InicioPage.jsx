import React from 'react'
import Header from '../components/Header'
import Inicio from '../components/Main'
import Intereses from '../components/Intereses'
import Ofertas from '../components/Ofertas'
import Footer from '../components/Footer'
import "../styles/InicioPage.css"

function InicioPage() {
  return (
    <div>
      <Header/>
      <Inicio/>
      <Intereses/>
      <Ofertas/>
      <Footer/>
    </div>
  )
}

export default InicioPage
