import React, { useState, useEffect } from 'react';
import '../styles/public.css'; // Asegúrate de tener este archivo CSS

import InteresesServices from '../services/interesesServices';


function Publicar() {

  const [Intereses, setIntereses] = useState([])
  const [ErrorIntereses, setErrorIntereses] = useState([]

  )
   useEffect(() => {
        let isMounted = true;
        const fetch = async () => {
            try {
                const DatosIntereses = await InteresesServices.GetIntereses();
  
                if (isMounted) {
                    setIntereses(DatosIntereses);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorIntereses(error.message);
                }
            }
        };
    
        fetch();
    
        return () => {
            isMounted = false;
        };
  
        
    }, []);



  return (
    <div className="publicarContainer">
      <div className="cuadro">

        <h3>Selecciona una imagen</h3>
        <input type="file" />

        <h3>Nombre del puesto vacante</h3>
        <input type="text" placeholder="Ej: Programador Full Stack" />

        <h3>Cantidad de vacantes</h3>
        <input type="number" placeholder="Ej: 1" />

        <h3>Ubicación</h3>
        <input type="text" placeholder="Ej: Chacarita" />
      </div>


      <div className="cuadro">

         <select name="" id="">
              <option value="">Área de trabajo</option>
            {Intereses.map((interes, index) => (
                <option key={index} value={interes.nombre_interes}>
                  {interes.nombre_interes}
                  </option>
            ))}
              </select>

        <h3>Salario</h3>
        <input type="text" placeholder="Ej: $150000" />

        <h3>Descripción general y requisitos</h3>
        <textarea placeholder="Describe el puesto..." rows="5"></textarea>

        <div className='btnpublic' style={{ marginTop: '20px' }}>
          <button>Publicar</button>
        </div>
      </div>
    </div>
  );
}

export default Publicar;

