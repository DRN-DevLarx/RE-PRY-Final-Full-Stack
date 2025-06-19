import React, { useEffect, useState } from 'react';
import "../styles/ofertas.css";
import InteresesServices from '../services/interesesServices';
import OfertasServices from '../services/ofertasServices';


function Ofertas() {

  const [Intereses, setIntereses] = useState([]);
  const [ErrorIntereses, setErrorIntereses] =  useState(null);

  const [Ofertas, setOfertas] = useState([]);
  const [ErrorOfertas, setErrorOfertas] = useState(null);


  const [FiltroAreaTrabajo, setFiltroAreaTrabajo] = useState()
  const [FiltroUbicacion, setFiltroUbicacion] = useState("")
  const [FiltroSalario, setFiltroSalario] = useState("")
  const [FiltroEstado, setFiltroEstado] = useState("")
  const [FiltroInput, setFiltroInput] = useState("")


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

    function filtrarOfertas(Ofertas, FiltroAreaTrabajo, FiltroUbicacion, FiltroSalario, FiltroInput) {
    // Si todos los filtros están vacíos, devuelve la lista completa
    if (
      FiltroAreaTrabajo == "" || FiltroAreaTrabajo == undefined &&
      FiltroUbicacion == "" &&
      FiltroSalario == "" &&
      FiltroInput.trim() == ""
    ) {
      return Ofertas;
    }

    return Ofertas.filter(oferta => {
      const cumpleAreaTrabajo = FiltroAreaTrabajo != undefined ? oferta.intereses == FiltroAreaTrabajo: true;
      const cumpleUbicacion = FiltroUbicacion != "" ? oferta.ubicacion_oferta.toLowerCase() == FiltroUbicacion.toLowerCase() : true;
      const cumpleSalario = FiltroSalario != "" ? oferta.salario_oferta == FiltroSalario : true;
      const cumpleInput = FiltroInput.trim() != "" ? oferta.titulo_oferta.toLowerCase().includes(FiltroInput.toLowerCase()) || oferta.ubicacion_oferta.toLowerCase().includes(FiltroInput.toLowerCase()) || oferta.fecha_oferta.toLowerCase().includes(FiltroInput.toLowerCase()) : true;
      
      return cumpleAreaTrabajo && cumpleUbicacion && cumpleSalario && cumpleInput;
    });
  }

  // Llamada a la función
  let Filtrado = filtrarOfertas(Ofertas, FiltroAreaTrabajo, FiltroUbicacion, FiltroSalario, FiltroEstado, FiltroInput);
  
  console.log(Filtrado);
  

  return (
    <div>
        <div id='trabajosD'>

          <h1 className='b'>Ofertas Disponibles</h1>
          <hr className='hh' />
          <br />

            

            <div className='filtrosAdmin'>
              
              <select value={FiltroAreaTrabajo} onChange={(e) => setFiltroAreaTrabajo(e.target.value)}  name="" id="">
                <option value="">Area de trabajo</option>
                {Intereses.map((interes, index) => (
                  <option key={index} value={interes.id}>
                    {interes.nombre_interes}
                  </option>
                ))}
              </select>

              <select value={FiltroUbicacion} onChange={(e) => setFiltroUbicacion(e.target.value)}  className='filtroUbicacion' name="">
                <option value="">Ubicación</option>
                <option value="Puntarenas">Puntarenas</option>
                <option value="Pitahaya">Pitahaya</option>
                <option value="Chomes">Chomes</option>
                <option value="Barranca">Barranca</option>
                <option value="Chacarita">Chacarita</option>
                <option value="Acapulco">Acapulco</option>
                <option value="Arancibia">Arancibia</option>
                <option value="Espiritu_santo">Espíritu Santo</option>
                <option value="San Juan grande">San Juan Grande</option>
                <option value="Macacona">Macacona</option>
                <option value="San Rafael">San Rafael</option>
                <option value="San Jeronimo">San Jerónimo</option>
                <option value="Miramar">Miramar</option>
                <option value="La Union">La Unión</option>
                <option value="San Isidro">San Isidro</option>
              </select>

              <select value={FiltroSalario} onChange={(e) => setFiltroSalario(e.target.value)}  className='SalarioFiltro' name="">
                <option value="">Salario</option>
                <option value="₡100,000 - ₡300,000"> ₡100,000 - ₡300,000</option>
                <option value="₡300,000 - ₡500,000"> ₡300,000 - ₡500,000</option>
                <option value="₡500,000 - ₡700,000"> ₡500,000 - ₡700,000</option>
                <option value="₡700,000 - ₡900,00"> ₡700,000 - ₡900,000</option>
                <option value="₡900,000 - ₡1,100,000"> ₡900,000 - ₡1,100,000</option>
                <option value="₡1,100,000 - ₡1,300,000"> ₡1,100,000 - ₡1,300,000</option>
                <option value="₡1,300,000 - ₡1,600,000"> ₡1,300,000 - ₡1,600,000</option>
                <option value="₡1,600,000 - ₡2,000,000"> ₡1,600,000 - ₡2,000,000</option>
                <option value="₡2,000,000 - ₡2,500,000"> ₡2,000,000 - ₡2,500,000</option>
                <option value="₡2,500,000 - ₡3,000,000"> ₡2,500,000 - ₡3,000,000</option>
              </select>

              <input value={FiltroInput} onChange={(e) => setFiltroInput(e.target.value)} type="text" placeholder='Palabra clave' /> 

            </div>

          
            <div id='SectOfertas'>

              <div id='containerOf'>
              {
                Filtrado.map((oferta, index) => (
                  
                    <article  key={index}>
                      <h3>{oferta.titulo_oferta}</h3>
                      <img className='imgOferta' src={oferta.referenciaIMG_oferta} alt=""/>
                      <p><b>Interes: </b>{oferta.intereses}</p>
                      <p><b>Vacantes: </b>{oferta.vacantes_oferta}</p>
                      <p><b>Ubicacion: </b> {oferta.ubicacion_oferta}</p>
                      <p><b>Fecha de Publicación:</b> {new Date(oferta.fecha_oferta).toLocaleString()}</p>
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
