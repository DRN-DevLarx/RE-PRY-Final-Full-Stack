import React, { useEffect, useState } from 'react';
import "../styles/ofertas.css";
import InteresesServices from '../services/interesesServices';
import OfertasServices from '../services/ofertasServices';


function Ofertas() {

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
        <div id='trabajosD'>

          <h1 className='b'>Ofertas Disponibles</h1>
          <hr className='hh' />
          <br />

            

          <div className='filtros'>
            
              <select name="" id="">
              <option value="">Area de trabajo</option>
            {Intereses.map((interes, index) => (
                <option key={index} value={interes.nombre_interes}>
                  {interes.nombre_interes}
                  </option>
            ))}
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

              <div id='containerOf'>
              {
                Ofertas.map((oferta, index) => (
                  
                    <article  key={index}>
                      <h3>{oferta.titulo_oferta}</h3>
                      <img className='imgOferta' src="/FB.avif" alt=""/>
                      <p><b>Interes: </b>{oferta.intereses}</p>
                      <p><b>Vacantes: </b>{oferta.vacantes_oferta}</p>
                      <p><b>Ubicacion: </b> {oferta.ubicacion_oferta}</p>
                      <p><b>Fecha de Publicacion:</b> {oferta.fecha_oferta}</p>
                    </article>
              ))
            }
            </div>

              
            </div>
           
        </div>
    </div>
  )
}

export default Ofertas
