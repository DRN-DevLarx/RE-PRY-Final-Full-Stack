import NavComponent from '../components/NavComponent'
import Notificaciones from '../components/Notificaciones'
import  PerfilUsuario from '../components/PerfilUsuario' 
import Ofertas from '../components/Ofertas'
import Footer from '../components/Footer'
import BotonesAdmin from '../components/BotonesAdmin'

function PrincipalPage() {

    function getCookie(name) {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
        return value;
        }
    }
    return null;
    }

    const Rol = getCookie("role")

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

export default PrincipalPage



