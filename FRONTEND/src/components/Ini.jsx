// Ini.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/ini.css";

function Ini() {
  return (
    <div className="bodyinicio">
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
                  <Link to="/register" className="btn btn-primary">
                    Registrarse
                  </Link>
                </li>
                  <li className="nav-item">
                  <Link to="/register" className="btn btn-primary">
                    Logearse
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="contenedorInicial">
          <div className="derecha">
            <div className="rectangulos">
              <div className="capa1">
              
                <p>¿Necesitas soporte? Escríbenos</p>
              </div>
              <div className="capa2">
                <a href="#">Inicio</a>
                <a href="#about">Sobre nosotros</a>
                <p Link to="/cys">Contacto y soporte</p>
              </div>
            </div>
          </div>
          <div className="contenedor_texto_central">
            <div className="texto_central">
              <span className="text-light">
                <b>
                  Oportunidades laborales al alcance de tu mano, descúbrelas aquí.
                </b>
              </span>
            </div>
            <button id="btnoferta">Ver Ofertas</button>
          </div>
        </div>
        <div id='divcategorias'>
          <div id='contP'>
            <div id='containerCat'>
              <article>
                Turismo y Hoteleria
              </article>
              <article>
                Comercio y Ventas
              </article>
              <article>
                Educación y Salud
              </article>
              <article>
                Construcción
              </article>
              <article>
                Tecnologia
              </article>

              <article>
                Servicios
              </article>
            </div>

            <div id='containerCat2'>
              <article>
                Pesca y Agricultura
              </article>
            </div>
          </div>

        </div>
        <div id='about'>
          <div>
            <h1>Sobre Nosotros</h1> <hr className='hh'/><br />
            
            <div className='text'>
              <p >"Somos una plataforma dedicada a conectar talento local con oportunidades laborales en la 
              zona norte de Puntarenas. Creemos en el poder de la tecnología para impulsar el crecimiento económico 
              y fortalecer nuestra comunidad, ofreciendo un espacio accesible donde empleadores y buscadores de empleo 
              puedan encontrarse fácilmente. Nos comprometemos a brindar información actualizada y herramientas para
              facilitar el desarrollo profesional de quienes buscan avanzar en su carrera. Juntos, trabajamos por
              un futuro más próspero y lleno de posibilidades."</p>
            </div>

          </div>
        
        

        </div>
        <div id='bloq2'>
          <div className='bl'>

            <h1 className='b'>Trabajos Disponibles</h1>

          </div><hr className='hh' />

          <div className='filtros'>
            <select name="" id="">
              <option  value="">Area de Trabajo</option>
              <option value="">Turismo y Hoteleria</option>
              <option value="">Comercio y Ventas</option>
              <option value="">Educación y Salud</option>
              <option value="">Construcción</option>
              <option value="">Tecnologia</option>
              <option value="">Servicios</option>
              <option value="">Pesca y Agricultura</option>
            </select>
            <select name="" id="">
              <option value="">Ubicacion</option>

            </select>
            <select name="" id="">
              <option value="">Salario</option>
            </select>
            <input type="text" placeholder='Busqueda' /> 
          </div>
           


       

                  <div class="row">
              <div class="col-sm-6 mb-3 mb-sm-0">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  
                  </div>
                </div>
              </div>
            </div>

               </div>

      </main>

<div>
  <footer  className='derech'>
    <div className='foor'>
      <h1 className='t1'>Contacto del Creador</h1><hr className='lin' />
    </div>

    <div  className='for'>
      <h1 className='t2'>Sobre Esta Web</h1><hr className='li'/>
    </div>


  </footer>
</div>

   
      
    </div>

    
  );
}

export default Ini;
