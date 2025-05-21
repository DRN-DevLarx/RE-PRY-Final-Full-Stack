import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from '../pages/Inicio';
import Administrador from '../pages/Administrador';

import Login from '../pages/Login';
import Register from '../pages/Register';



function Routing() {
  return (


    <Router>
        <Routes >
            <Route  path='/admin' element={<Administrador/>}/>
            <Route  path='/login' element={<Login/>}/>
            <Route  path='/register' element={<Register/>}/>
            <Route  path='/Inicio' element={<Inicio/>}/>
        </Routes>
    </Router>
  
    
  )
}

export default Routing