import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from '../pages/InicioPage';
import Administrador from '../pages/AdministradorPage';

import Login from '../pages/LoginPage';
import RegisterOferentes from '../pages/RegisterPageOferentes';
import RegisterEmpresas from '../pages/RegisterPageEmpresas';
import CYS from '../components/CYS';



function Routing() {
  return (


    <Router>
        <Routes >
            <Route  path='/' element={<Inicio/>}/>
            <Route  path='/admin' element={<Administrador/>}/>
            <Route  path='/login' element={<Login/>}/>
            <Route  path='/register1' element={<RegisterOferentes/>}/>
            <Route  path='/register2' element={<RegisterEmpresas/>}/>
            <Route  path='/cys' element={<CYS/>}/>
        </Routes>
    </Router>
  
    
  )
}

export default Routing