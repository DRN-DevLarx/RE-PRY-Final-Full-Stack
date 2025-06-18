
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/ini.css";


function Inicio() {

  return (
    <div>
      
      <main>
        <div className="contenedorInicial">
          <div className="derecha">
            <div className="rectangulos">
              <div className="capa1">
              
                <p>¿Necesitas soporte? Escríbenos</p>
              </div>
              <div className="capa2">
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


      </main>
      
    </div>

    
  );
}

export default Inicio;
