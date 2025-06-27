
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from '../pages/InicioPage';

import Login from '../pages/LoginPage';
import RegisterOferentes from '../pages/RegisterPageOferentes';
import RegisterEmpresas from '../pages/RegisterPageEmpresas';
import CYSPage from '../pages/CYSPage';
import RestablecerPage from '../pages/RestablecerPage';
import Publicar from '../pages/PublicarPage';
import DashboardPage from '../pages/DashboardPage';
import EditarPerfil from '../pages/EditarPerfil'

import PrincipalPage from '../pages/PrincipalPage';

import ApEmpleo from '../pages/ApEmpleo';
import ChatNotif from'../pages/ChatNotif';
import DetallesOfertaPage from '../pages/DetallesOfertaPage';

import PrivateRoute from '../components/PrivateRoute';

function Routing() {
  return (


    <Router>
        <Routes >
            {/* Rutas publicas */}
            <Route  path='/' element={<Inicio/>}/>
            <Route  path='/cys' element={<CYSPage/>}/>
            <Route  path='/registrarse' element={<RegisterOferentes/>}/>
            <Route  path='/registrarEmpresa' element={<RegisterEmpresas/>}/>
            <Route  path='/login' element={<Login/>}/>
            <Route  path='/restablecer' element={<RestablecerPage/>}/>
{/* 
            <Route  path='/PrincipalPage' element={<PrincipalPage/>}/>
            <Route  path='/public' element={<Publicar/>}/>
            <Route  path='/dashboard' element={<DashboardPage/>}/>
            <Route  path='/editperf' element={<EditarPerfil/>}/>
            <Route  path='/ApEmpleo' element={<ApEmpleo/>}/>
            <Route  path='/chat' element={<ChatNotif/>}/> */}

            {/* Rutas protegidas con PrivateRoute */}
            <Route path="/PrincipalPage" element={<PrivateRoute element={<PrincipalPage />} />}/>
            <Route path="/public"element={<PrivateRoute element={<Publicar/>} />}/>
            <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
            <Route path="/editperf" element={<PrivateRoute element={<EditarPerfil />} />} />
            <Route path="/aplicar" element={<PrivateRoute element={<ApEmpleo />} />} />
            <Route path="/chat" element={<PrivateRoute element={<ChatNotif />} />} />
            <Route path="/detallesOferta" element={<PrivateRoute element={<DetallesOfertaPage />} />} />
        </Routes>
    </Router>
  
    
  )
}

export default Routing