import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from '../pages/InicioPage';
import Administrador from '../pages/AdministradorPage';

import Login from '../pages/LoginPage';
import Register1 from '../pages/RegisterPage1';
import Register2 from '../pages/RegisterPage2';

import CYS from '../components/CYS';



function Routing() {
  return (


    <Router>
        <Routes >
            <Route  path='/admin' element={<Administrador/>}/>
            <Route  path='/login' element={<Login/>}/>
            <Route  path='/register1' element={<Register1/>}/>
            <Route  path='/register2' element={<Register2/>}/>
            <Route  path='/' element={<Inicio/>}/>
            <Route  path='/cys' element={<CYS/>}/>
        </Routes>
    </Router>
  
    
  )
}

export default Routing