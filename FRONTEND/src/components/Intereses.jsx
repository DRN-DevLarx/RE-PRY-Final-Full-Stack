import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InteresesServices from '../services/interesesServices';

function Intereses() {

  const [Intereses, setIntereses] = useState([]);
  const [ErrorIntereses, setErrorIntereses] = useState([])
  
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
  )
}

export default Intereses
