import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from '../pages/InicioPage';
import Administrador from '../pages/AdminPage';

import Login from '../pages/LoginPage';
import RegisterOferentes from '../pages/RegisterPageOferentes';
import RegisterEmpresas from '../pages/RegisterPageEmpresas';
import CYSPage from '../pages/CYSPage';
import RestablecerPage from '../pages/RestablecerPage';
import RestablecerPageConfirmar from '../pages/RestablecerPageConfirmar';
import Publicar from '../pages/PublicarPage';
import DashboardPage from '../pages/DashboardPage';
import OferentePage from '../pages/Oferentepage';
import EditarPerfil from '../pages/EditarPerfil'
import ApEmpleo from '../pages/ApEmpleo';
import ChatNotif from '../pages/ChatNotif';
function Routing() {
  return (


    <Router>
        <Routes >
            <Route  path='/' element={<Inicio/>}/>
            <Route  path='/cys' element={<CYSPage/>}/>
            <Route  path='/registrase' element={<RegisterOferentes/>}/>
            <Route  path='/registrarEmpresa' element={<RegisterEmpresas/>}/>
            <Route  path='/login' element={<Login/>}/>
            <Route  path='/restablecer' element={<RestablecerPage/>}/>
            <Route  path='/restablecer/confirmar' element={<RestablecerPageConfirmar/>}/>
            <Route  path='/admin' element={<Administrador/>}/>
            <Route  path='/public' element={<Publicar/>}/>
            <Route  path='/dashboard' element={<DashboardPage/>}/>
            <Route  path='/Oferente' element={<OferentePage/>}/>
            <Route  path='/editperf' element={<EditarPerfil/>}/>
             <Route  path='/ApEmpleo' element={<ApEmpleo/>}/>
              <Route  path='/chat' element={<ChatNotif/>}/>

        </Routes>
    </Router>
  
    
  )
}

export default Routing