import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Administrador from '../pages/Administrador';
import LibrosCrudPage from '../pages/LibrosCrudPage';
import Login from '../pages/Login';
import Register from '../pages/Register';



function Routing() {
  return (


    <Router>
        <Routes >
            <Route  path='/admin' element={<Administrador/>}/>
            <Route  path='/login' element={<Login/>}/>
            <Route  path='/register' element={<Register/>}/>
            <Route  path='/libros' element={<LibrosCrudPage/>}/>
        </Routes>
    </Router>
  
    
  )
}

export default Routing