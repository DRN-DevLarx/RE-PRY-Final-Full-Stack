import React from 'react';
import '../styles/TerminosYCondiciones.css'

import { useNavigate } from 'react-router-dom'
function TerminosyCondiciones() {

    const navigate = useNavigate();

    function volver() {
        setTimeout(() => {
            navigate('/')            
        }, 200);
    }

  return (
    <div id="contenedorTerminos">
      <div className='Flecha'>
             <svg onClick={volver} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="svgTYC bi bi-arrow-left-circle"  viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
      </svg>
      </div>

      <div id="cardTerminos">

        <h1>Términos y Condiciones – EmpleaTico</h1>

        <h2>1. Aceptación de los Términos</h2>
        <p>
          Al utilizar esta plataforma, el usuario acepta cumplir con estos Términos y Condiciones. En caso contrario, se le solicita no utilizar el sitio.
        </p>

        <h2>2. Descripción del Servicio</h2>
        <p>
          EmpleaTico es una plataforma digital para conectar a empleadores y personas en búsqueda de empleo en la zona norte de Puntarenas, Costa Rica.
        </p>

        <h2>3. Acceso y Registro</h2>
        <p>
          El acceso general al sitio es libre. Para aplicar a ofertas o gestionar un perfil, el usuario debe registrarse y proporcionar datos verídicos.
        </p>

        <h2>4. Propiedad Intelectual</h2>
        <p>
          El diseño, estructura, funcionalidades y contenidos del sitio son propiedad exclusiva del equipo desarrollador y no pueden ser reproducidos sin permiso.
        </p>

        <h2>5. Responsabilidades del Usuario</h2>
        <p>
          El usuario se compromete a hacer un uso responsable de la plataforma y no publicar información falsa, ofensiva o fraudulenta.
        </p>

        <h2>6. Limitación de Responsabilidad</h2>
        <p>
          EmpleaTico no garantiza la veracidad ni disponibilidad de las ofertas laborales. Las decisiones tomadas con base en la información del sitio son responsabilidad exclusiva del usuario.
        </p>

        <h2>7. Modificaciones</h2>
        <p>
          Los presentes términos pueden ser modificados en cualquier momento. La versión actualizada estará disponible en esta misma sección.
        </p>

        <h2>8. Legislación Aplicable</h2>
        <p>
          Este documento se rige por la legislación de Costa Rica. Cualquier conflicto será resuelto por los tribunales de dicho país.
        </p>

        <h2>9. Contacto</h2>
        <p>
          Para consultas, puede escribirnos al correo: <strong>soporte@empleatico.com</strong>
        </p><br />
        <span className='spa'>Actualizado el 24/06/2025</span>
      </div>
     <br /><br /><br />
    </div>
  );
}

export default TerminosyCondiciones;