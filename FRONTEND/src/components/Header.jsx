import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  
  document.cookie.split(";").forEach(cookie => document.cookie = cookie.split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");


  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <img className="logo" src="../public/Iconlogo.png" alt="Logo" />
            <h2 id="tituloNav"><b>EmpleaTico</b></h2>
            
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menuPrincipal"
              aria-controls="menuPrincipal"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="menuPrincipal">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/registrarse" className="btn-second">
                    Registrarse
                  </Link>
                </li>

                  <li className="nav-item">
                  <Link to="/login" className="btn-prim">
                    Iniciar sesión
                  </Link>
                </li>
              </ul>
              
            </div>

          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header
