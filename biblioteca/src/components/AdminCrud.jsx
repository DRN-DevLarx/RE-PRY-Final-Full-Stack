import React from 'react'

import '../styles/sidebar.css'

import { Link } from 'react-router-dom'

function AdminCrud() {
  return (
    <div className='sidebar'>
         
         <h2>Menu de Mantenimientos</h2>
         <ul>
          <li>
             <Link to ="/libros">Mantenimiento Libros</Link>
          </li>
              <li>
             <Link to ="/libros">Mantenimiento Usuarios</Link>
          </li>
            <li>
             <Link to ="/libros">Mantenimiento Categorias</Link>
          </li>
         </ul>

    </div>
  )
}

export default AdminCrud