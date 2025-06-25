import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InteresesServices from '../services/interesesServices';
import OfertasServices from '../services/ofertasServices';
import GetCookie from '../services/GetCookie';

import { CerrarDashboard } from './CerrarDashboard';

import "../styles/Publicaciones.css"

function MisPublicaciones() {
  
  const navigate = useNavigate();
  
    
  const [Intereses, setIntereses] = useState([]);
  const [ErrorIntereses, setErrorIntereses] =  useState(null);

  const [Ofertas, setOfertas] = useState([]);
  const [ErrorOfertas, setErrorOfertas] = useState(null);

  const [ContDetalles, setContDetalles] = useState(false)
  const [ButtonActivar, setButtonActivar] = useState(false)

  const [FiltroAreaTrabajo, setFiltroAreaTrabajo] = useState()
  const [FiltroUbicacion, setFiltroUbicacion] = useState("")
  const [FiltroSalario, setFiltroSalario] = useState("")
  const [FiltroEstado, setFiltroEstado] = useState("")
  const [FiltroInput, setFiltroInput] = useState("")

  const idUser = GetCookie.getCookie("user_id")
  const [IDOferta, setIDOferta] = useState()
  const [EstadoOferta, setEstadoOferta] = useState("")

  
  useEffect(() => {
      const fetch = async () => {
          try {
              const DatosIntereses = await InteresesServices.GetIntereses();
              const DatosOfertas = await OfertasServices.GetOfertas();

              if(EstadoOferta == "desactiva") {
                setButtonActivar(true)
              }

              if (DatosIntereses && DatosOfertas) {
                  setIntereses(DatosIntereses);
                  setOfertas(DatosOfertas);
              }
          } catch (error) {
          }
      };
  
      fetch();
  
  }, [EstadoOferta]);




  function VerDetallesAdmin(id, estado) {
    setContDetalles(true)
    setIDOferta(id)
    setEstadoOferta(estado)
  }
  
  function exitDashboard() {
    CerrarDashboard(navigate)
  }
  
 
  function filtrarOfertas(Ofertas, FiltroAreaTrabajo, FiltroUbicacion, FiltroSalario, FiltroEstado, FiltroInput) {

    if (
      FiltroAreaTrabajo == "" || FiltroAreaTrabajo == undefined &&
      FiltroUbicacion == "" &&
      FiltroSalario == "" &&
      FiltroEstado == "" &&
      FiltroInput.trim() == ""
    ) {
      return Ofertas;
    }

    return Ofertas.filter(oferta => {
      const cumpleAreaTrabajo = FiltroAreaTrabajo != undefined ? oferta.intereses == FiltroAreaTrabajo: true;
      const cumpleUbicacion = FiltroUbicacion != "" ? oferta.ubicacion_oferta.toLowerCase() == FiltroUbicacion.toLowerCase() : true;
      const cumpleSalario = FiltroSalario != "" ? oferta.salario_oferta == FiltroSalario : true;
      const cumpleEstado = FiltroEstado != "" ? oferta.estado_oferta.toLowerCase().includes(FiltroEstado.toLowerCase()) : true;
      const cumpleInput = FiltroInput.trim() != "" ? oferta.titulo_oferta.toLowerCase().includes(FiltroInput.toLowerCase()) || oferta.ubicacion_oferta.toLowerCase() == FiltroInput.toLowerCase() || oferta.fecha_oferta.toLowerCase().includes(FiltroInput.toLowerCase()) : true;
      
      return cumpleAreaTrabajo && cumpleUbicacion && cumpleSalario && cumpleEstado && cumpleInput;
    });
  }


  let Filtrado = filtrarOfertas(Ofertas, FiltroAreaTrabajo, FiltroUbicacion, FiltroSalario, FiltroEstado, FiltroInput);
  
  function Volver() {
    setContDetalles(false)
  }


  async function DesactivarOferta() {
    
    const obj = {
      estado_oferta: "desactiva",
    }

    await OfertasServices.PutOfertas(IDOferta, obj)
    setButtonActivar(true)
  }

  async function ActivarOferta() {
    
    const obj = {
      estado_oferta: "activas",
    }

    await OfertasServices.PutOfertas(IDOferta, obj)
    setButtonActivar(false)
  }
    

  return (
    <div id='ContPerfilAdmin'>

      {!ContDetalles && (
        <div>

          <div className='headerDashboard'>
            <h3>Publicaciones</h3>
            <svg onClick={exitDashboard} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
              <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>
          </div>
        
          <div className='trabajosDAdmi'>
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
    
              <select value={FiltroEstado} onChange={(e) => setFiltroEstado(e.target.value)} name="" id="">
                  <option value="">Estado</option>
                  <option value="activas">Activas</option>
                  <option value="desactiva">Desactivas</option>
              </select>

              <input value={FiltroInput} onChange={(e) => setFiltroInput(e.target.value)} type="text" placeholder='Palabra clave' /> 

            </div>

            <div id='SectOfertasAdmin'>

              <div id='containerOfAdmin'>
                              
                {/* {Filtrado.filter(oferta => oferta.empresa == idUser).map((oferta, index) => { */}
                {Filtrado.filter(oferta => oferta).map((oferta, index) => {
                  
                    const interesesRelacionados = Intereses.filter(INTERES => INTERES.id === oferta.intereses);

                    const statusOferta = oferta.estado_oferta === "desactiva" ? "statusDesactiva" : "StatusActiva";

                    
                    return (
                        <article className={statusOferta} onClick={() => VerDetallesAdmin(oferta.id, oferta.estado_oferta)} key={index}>
                            <h3>{oferta.titulo_oferta}</h3>
                            <img className='imgOfertaAdmin' src={oferta.referenciaIMG_oferta} alt="Imagen de oferta"/>
                            <p><b>Área de trabajo: </b>{interesesRelacionados.map(i => i.nombre_interes).join(', ')}</p>
                            <p><b>Vacantes: </b>{oferta.vacantes_oferta}</p>
                            <p><b>Ubicación: </b>{oferta.ubicacion_oferta}</p>
                            <p><b>Fecha de Publicación:</b> {new Date(oferta.fecha_oferta).toLocaleString()}</p>
                        </article>
                    );
                })}
              </div>

            </div>
          </div>
        </div>
      )}

      {ContDetalles && (
        <div>
            <button onClick={Volver}  className='SDM'>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
              </svg> Volver
            </button>

          <div className='SectionDetallesAdmin'>
            

            {Ofertas.filter(Ofertaa => Ofertaa.id === IDOferta).map(Oferts => {
              let InteresesDetalles = Intereses.filter(INTERES => INTERES.id == Oferts.intereses);
              
              return ( 
                <div key={Oferts.id} className='ContMainDetallesAdmin'>
                  <h2 className="titulo-ofertaAdmin">{Oferts.titulo_oferta}</h2>

                  <div className="grid-detallesAdmin">
                    <div className="columna">
                      <div className="item"><span role="img" aria-label="dinero">💰</span> <b className='b'> Salario: </b> {Oferts.salario_oferta} </div>
                      <div className="item"><span role="img" aria-label="ubicación">📍</span> <b className='b'> Ubicación: </b> {Oferts.ubicacion_oferta}</div>
                      <div className="item"><span role="img" aria-label="fecha">🕒</span> <b className='b'> Fecha de publicación: </b> {new Date(Oferts.fecha_oferta).toLocaleString()}</div>
                    </div>

                    <div className="columna">
                      <div className="item"><span role="img" aria-label="área">🔲</span> <b className='b'> Área de trabajo: </b> {InteresesDetalles.map(i => i.nombre_interes).join(', ')}</div>
                      <div className="item"><span role="img" aria-label="vacantes">🧮</span> <b className='b'> Vacantes: </b> {Oferts.vacantes_oferta}</div>
                      <div className="item"><span role="img" aria-label="perfil">👤</span> <b className='b'> Nombre del puesto: </b> {Oferts.nombre_puesto_oferta}</div>
                    </div>
                  </div>

                  <div className="card-contenedorAdmin">
                    <h4> Descripción y requisitos: </h4>
                    <div className="descripcionAdmin">
                      {Oferts.descripcion_oferta}
                    </div>
                  </div>

                  {!ButtonActivar && (
                    <div className="boton-desactivar">
                      <button onClick={DesactivarOferta}> Desactivar</button>
                    </div>
                  )}

                  {ButtonActivar && (
                    <div className="boton-activar">
                      <button onClick={ActivarOferta}> Activar</button>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>

        )}
    </div>
  );
}

export default MisPublicaciones;
