import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InteresesServices from '../services/interesesServices';
import OfertasServices from '../services/ofertasServices';
import GetCookie from '../services/GetCookie';
import Swal from 'sweetalert2';

import "../styles/ofertas.css";

function Ofertas() {

  const navigate = useNavigate();
  const [Intereses, setIntereses] = useState([]);
  const [ErrorIntereses, setErrorIntereses] =  useState(null);

  const [Ofertas, setOfertas] = useState([]);
  const [ErrorOfertas, setErrorOfertas] = useState(null);


  const [FiltroInput, setFiltroInput] = useState("")

  let UsuarioLogiado = false;
  const Access_token = GetCookie.getCookie("access_token");

  if (Access_token) {
    UsuarioLogiado = true;
  }
  
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
  
  const VerDetalles = (id) => {    
    document.cookie = `IdOferta=${id}; path=/; secure; SameSite=Strict`;

    navigate("/detallesOferta");
  }

  function filtrarOfertas(Ofertas, FiltroInput) {
    if (!FiltroInput || FiltroInput.trim() === "") return Ofertas;

    return Ofertas.filter(oferta => {
      const input = FiltroInput.toLowerCase();

      return (
        oferta.titulo_oferta.toLowerCase().includes(input) ||
        oferta.ubicacion_oferta.toLowerCase().includes(input) ||
        oferta.salario_oferta?.toString().includes(input) ||
        oferta.intereses_nombre?.toLowerCase().includes(input) || 
        console.log(oferta.intereses_nombre)
    
      );
    });
  }

  let Filtrado = filtrarOfertas(Ofertas, FiltroInput);

  function Detalles_login() {
    
    Swal.fire({
      icon: "info",
      text: "Inicia sesión para ver los detalles.",
      confirmButtonColor: "#2ae2b6",
      background: "#1a1a1a",
      color: "#ffffff",
      confirmButtonText: "Ok",
    });

    navigate("/login")
  }

  return (
    <div>
        <div id='trabajosD'>

          <h1 className='b'>Ofertas Disponibles</h1>
          <hr className='hh' />
          <br />
            
          <div className="barra-busqueda">
            <input type="text" placeholder="Buscar ofertas por título, ubicación o área" value={FiltroInput} onChange={(e) => setFiltroInput(e.target.value)} />
          </div>


            {UsuarioLogiado && (
              <div id='SectOfertas'>
                <div id='containerOf'>
                  {Filtrado.map((oferta, index) => (oferta.estado_oferta == "activas") && (
                    <article onClick={(e) => VerDetalles(oferta.id)} key={index}>
                      <h3>{oferta.titulo_oferta}</h3>
                      <img className='imgOferta' src={oferta.referenciaIMG_oferta} alt=""/>
                      <p><b>Interes: </b>{oferta.intereses}</p>
                      <p><b>Vacantes: </b>{oferta.vacantes_oferta}</p>
                      <p><b>Ubicacion: </b> {oferta.ubicacion_oferta}</p>
                      <p><b>Fecha de Publicación:</b> {new Date(oferta.fecha_oferta).toLocaleDateString()}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {!UsuarioLogiado && (
              <div id='SectOfertas'>
                  <div id='containerOf'>
                    {Filtrado
                      .filter((oferta) => oferta.estado_oferta == "activas").map((oferta) => {
                        const interesesRelacionados = Intereses.filter(
                          (interes) => interes.id === oferta.intereses
                        );

                        return (
                          <article onClick={Detalles_login} key={oferta.id_oferta || oferta.titulo_oferta}>
                            <h3>{oferta.titulo_oferta}</h3>
                            {oferta.referenciaIMG_oferta && (
                              <img
                                className="imgOferta"
                                src={oferta.referenciaIMG_oferta}
                                alt={`Imagen de ${oferta.titulo_oferta}`}
                              />
                            )}
                            <p>
                              <b>Área de trabajo:</b>{" "}
                              {interesesRelacionados.map((i) => i.nombre_interes).join(", ")}
                            </p>
                            <p>
                              <b>Vacantes:</b> {oferta.vacantes_oferta}
                            </p>
                            <p>
                              <b>Ubicación:</b> {oferta.ubicacion_oferta}
                            </p>
                            <p>
                              <b>Fecha de Publicación:</b>{" "}
                              {new Date(oferta.fecha_oferta).toLocaleDateString()}
                            </p>
                          </article>
                        );
                      })}


                </div>
              </div>
            )}
           
        </div>
    </div>
  )
}

export default Ofertas
