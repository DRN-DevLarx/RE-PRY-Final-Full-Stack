import NavComponent from '../components/NavComponent'
import Notificaciones from '../components/Notificaciones'
import  PerfilUsuario from '../components/PerfilUsuario' 
import Ofertas from '../components/Ofertas'
import Footer from '../components/Footer'

function PrincipalPage() {

  return (
    <div>
        <NavComponent/>
        <Notificaciones/>
        <PerfilUsuario />
        <Ofertas/>
        <Footer/>
    </div>
  )
}

export default PrincipalPage



