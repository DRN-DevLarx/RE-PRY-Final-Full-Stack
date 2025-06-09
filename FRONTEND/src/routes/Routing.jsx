import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from '../pages/InicioPage';

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
<<<<<<< HEAD
import ChatNotif from '../pages/ChatNotif';
=======

import PrincipalPage from '../pages/PrincipalPage';

>>>>>>> 317bd4c4878e9116680e0bfb1b9f6e07faf5c52d
function Routing() {
  return (


    <Router>
        <Routes >
            <Route  path='/' element={<Inicio/>}/>
            <Route  path='/cys' element={<CYSPage/>}/>
            <Route  path='/registrarse' element={<RegisterOferentes/>}/>
            <Route  path='/registrarEmpresa' element={<RegisterEmpresas/>}/>
            <Route  path='/login' element={<Login/>}/>
            <Route  path='/restablecer' element={<RestablecerPage/>}/>
            <Route  path='/restablecer/confirmar' element={<RestablecerPageConfirmar/>}/>

            <Route  path='/PrincipalPage' element={<PrincipalPage/>}/>

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