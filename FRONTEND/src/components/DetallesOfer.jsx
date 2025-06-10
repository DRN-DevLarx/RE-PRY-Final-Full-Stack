import React from 'react';
import '../styles/DetallesOfer.css';
import BTNActivar from './BTNAplicar';

import {useNavigate} from "react-router-dom";
import BTNAplicar from './BTNAplicar';

function DetallesOfer() {
    const navigate = useNavigate()


    function exitDashboard() {
        navigate("/PrincipalPage")
    }

  return (
    <div className='bodyDetallesDashboard'>
        
        <div className='headerPerfilDetalles'>
        <h3>Publicaciones desactivadas</h3>
        
        <svg onClick={exitDashboard} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
          <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
        </svg>
        </div>

        <div className='ContMainDetalles'>
             
            <div className="contenedor-detalles">
                <h2 className="titulo-oferta">Programador Full Stack</h2>

                <div className="grid-detalles">
                <div className="columna">
                    <div className="item"><span role="img" aria-label="dinero">💰</span> 1 mill. a 1500</div>
                    <div className="item"><span role="img" aria-label="ubicación">📍</span> Chacarita</div>
                    <div className="item"><span role="img" aria-label="fecha">🕒</span> 15/05/2025</div>
                </div>
                <div className="columna">
                    <div className="item"><span role="img" aria-label="área">🔲</span> Tecnología</div>
                    <div className="item"><span role="img" aria-label="vacantes">🧮</span> Vacantes: 1</div>
                    <div className="item"><span role="img" aria-label="perfil">👤</span> Programar con don carlos</div>
                </div>
                </div>
            </div>

            <div className="card-contenedor">
                <p className="descripcion">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque deserunt, incidunt saepe libero culpa architecto aliquam, facilis quae eligendi in, animi rem. Ex aperiam voluptatibus commodi, vero consequuntur iste explicabo?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio corrupti quos distinctio voluptate itaque magnam fuga obcaecati praesentium facere saepe error eius voluptatibus ea, soluta voluptates repudiandae, est minus. Veritatis!
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque deserunt, incidunt saepe libero culpa architecto aliquam, facilis quae eligendi in, animi rem. Ex aperiam voluptatibus commodi, vero consequuntur iste explicabo?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio corrupti quos distinctio voluptate itaque magnam fuga obcaecati praesentium facere saepe error eius voluptatibus ea, soluta voluptates repudiandae, est minus. Veritatis!
                </p>
                <p className="requisitos-titulo">Requisitos:</p>
                <ul className="lista">
                <li>Excepteur sint occaecat cupidatat non proident</li>
                <li>Sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                </ul>

            </div>
            <div>
                <BTNAplicar/>
            </div>
            

    </div>
    </div>
  );
}

export default DetallesOfer;