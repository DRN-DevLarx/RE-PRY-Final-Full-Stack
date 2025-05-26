
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/ini.css";
import InteresesServices from '../services/interesesServices';
import OfertasServices from '../services/ofertasServices';



function Inicio() {

  const [Intereses, setIntereses] = useState([]);
  const [ErrorIntereses, setErrorIntereses] =  useState(null);

  const [Ofertas, setOfertas] = useState([]);
  const [ErrorOfertas, setErrorOfertas] = useState(null);

  useEffect(() => {
      let isMounted = true;
      const fetch = async () => {
          try {
              const DatosIntereses = await InteresesServices.GetIntereses();
              const DatosOfertas = await OfertasServices.GetOfertas();

              if (isMounted) {
                  setIntereses(DatosIntereses);
                  setOfertas(DatosOfertas);
              }
          } catch (error) {
              if (isMounted) {
                  setErrorIntereses(error.message);
                  setErrorOfertas(error.message);
              }
          }
      };
  
      fetch();
  
      return () => {
          isMounted = false;
      };

      
  }, []);



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
                  <Link to="/register1" className="btn-second">
                    Registrarse
                  </Link>
                </li>

                  <li className="nav-item">
                  <Link to="/register2  " className="btn-prim">
                    Iniciar sesión
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
                <p className='Inicio' href="#">Inicio</p>
                <a href="#about">Sobre nosotros</a>
                <p> <Link to="/cys">Contacto y soporte</Link> </p>

              </div>
            </div>
          </div>
          <div className="contenedor_texto_central">
            <div className="texto_central">
              <span className="text">
                <b>
                  Oportunidades laborales al alcance de tu mano, descúbrelas aquí.
                </b>
              </span>
            </div>
            <a id='btnoferta' href="#trabajosD"> Ver Ofertas</a>
          </div>
        </div>


        <div>

          <div id='contP'>
            {
              Intereses.map((interes, index) => (
                <div id='containerCat' key={index}>
                  <article>
                    {interes.nombre_interes}
                  </article>
            
                </div>

              ))
            }
          </div>

        </div>

        <div id='about'>
          <div>
            <h1>Sobre Nosotros</h1>
            <hr className='hh'/><br />
            
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


        <div id='trabajosD'>

          <h1 className='b'>Ofertas Disponibles</h1>
          <hr className='hh' />


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

            <input type="text" placeholder='Palabra clave' /> 

            <button id='btnBuscar'> Buscar </button>

          </div>
            <div id='SectOfertas'>

              
              {
                Ofertas.map((oferta, index) => (
                  <div id='containerOf' key={index}>
                  
                    <article>
                      <h5>{oferta.titulo_oferta}</h5>
                      <p><b>Interes: </b>{oferta.intereses}</p>
                      <p><b>Vacantes: </b>{oferta.vacantes_oferta}</p>
                      <p><b>Ubicacion: </b> {oferta.ubicacion_oferta}</p>
                      <p><b>Fecha de Publicacion:</b> {oferta.fecha_oferta}</p>
                    </article>

                    <article>
                      <h5>{oferta.titulo_oferta}</h5>
                      <p>Interes:{oferta.intereses_id}</p>
                      <p>Vacantes:{oferta.vacantes_oferta}</p>
                      <p>Ubicacion: {oferta.ubicacion_oferta}</p>
                      <p>Fecha de Publicacion: {oferta.fecha_publicacion_oferta}</p>
                    </article>

                    <article>
                      <h5>{oferta.titulo_oferta}</h5>
                      <p>Interes:{oferta.intereses_id}</p>
                      <p>Vacantes:{oferta.vacantes_oferta}</p>
                      <p>Ubicacion: {oferta.ubicacion_oferta}</p>
                      <p>Fecha de Publicacion: {oferta.fecha_publicacion_oferta}</p>
                    </article>

                    <article>
                      <h5>{oferta.titulo_oferta}</h5>
                      <p>Interes:{oferta.intereses_id}</p>
                      <p>Vacantes:{oferta.vacantes_oferta}</p>
                      <p>Ubicacion: {oferta.ubicacion_oferta}</p>
                      <p>Fecha de Publicacion: {oferta.fecha_publicacion_oferta}</p>
                    </article>
                  </div>
                
                ))
              }

              
            </div>
           
        </div>

      </main>

  
      <footer  id='footer'>
        <div className='FooterLeft'>
          <h1 className='t1'>Contacto del Creador</h1>
          <hr className='hh' />

            <div className='infoLeft'>
              <p><b>Nombre:</b>  Darien Aguilar</p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg>
                <a href="mailto:darienaguilar3000@gmail.com"> darienaguilar3000@gmail.com </a></p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                </svg>
                
                  100 metros Norte de la escuela Morales, casa color fucsia a mano izquierda.</p>           
              </div>
          

        </div>

        <div  className='FooterRight'>
          <h1 className='t2'>Sobre Esta Web</h1>
          <hr className='hh'/>

          <div className='infoRight'>
            <p>"Somos una plataforma dedicada a conectar talento local con oportunidades laborales en la zona norte de Puntarenas. Creemos en el poder de la tecnología para impulsar el crecimiento económico y fortalecer nuestra comunidad, ofreciendo un espacio accesible donde empleadores y buscadores de empleo puedan encontrarse fácilmente. Nos comprometemos a brindar información actualizada y herramientas para facilitar el desarrollo profesional de quienes buscan avanzar en su carrera. Juntos, trabajamos por un futuro más próspero y lleno de posibilidades."</p>
          </div>

        </div>

        <div className="footer_footer">
            <p>© 2023 EmpleaTico. Todos los derechos reservados.</p>
        </div>
      </footer>


   
      
    </div>

    
  );
}

export default Inicio;
