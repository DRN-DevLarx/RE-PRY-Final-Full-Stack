import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import InteresesServices from '../services/interesesServices';
import ofertasServices from '../services/ofertasServices';
import usersServices from '../services/usersServices';

import {useNavigate} from "react-router-dom";

import GetCookie from '../services/GetCookie';

import '../styles/DetallesOfer.css';

function DetallesOfer() {
    const navigate = useNavigate()




    const [FiltroAreaTrabajo, setFiltroAreaTrabajo] = useState()
    const [FiltroUbicacion, setFiltroUbicacion] = useState("")
    const [FiltroSalario, setFiltroSalario] = useState("")
    const [FiltroEstado, setFiltroEstado] = useState("")
    const [FiltroInput, setFiltroInput] = useState("")


    const [TituloOferta, setTituloOferta] = useState("")
    const [SalarioOferta, setSalarioOferta] = useState("")
    const [UbicacionOferta, setUbicacionOferta] = useState("")
    const [InteresOfertaNombre, setInteresOfertaNombre] = useState("")
    const [InteresOfertaID, setInteresOfertaID] = useState("")

    const [EmpresaOferta, setEmpresaOferta] = useState("")
    const [VacantesOferta, setVacantesOferta] = useState("")
    const [PuestoOferta, setPuestoOferta] = useState("")
    const [FechaOferta, setFechaOferta] = useState("")
    const [DescripcionOferta, setDescripcionOferta] = useState("")
    const [RImagenOferta, setRImagenOferta] = useState("")

    const IdOferta = GetCookie.getCookie("IdOferta");
    const Rol = GetCookie.getCookie("role");

    const [IsOferente, setIsOferente] = useState(false)
        

    useEffect(() => {
        const fetch = async () => {
            try {
              const DatosOfertas = await ofertasServices.GetOfertas();
                const DatosIntereses = await InteresesServices.GetIntereses();
                const DatosUsers = await usersServices.GetUser();


                if(Rol === "oferente"){
                  setIsOferente(true)
                }

                if (DatosOfertas && DatosIntereses && DatosUsers) {

                  DatosOfertas.filter((dato) => dato.id == IdOferta).map((oferta) => {
                      
                    setTituloOferta(oferta.titulo_oferta),
                    setPuestoOferta(oferta.nombre_puesto_oferta),
                    setVacantesOferta(oferta.vacantes_oferta),
                    setUbicacionOferta(oferta.ubicacion_oferta),
                    setFechaOferta(oferta.fecha_oferta)
                    setSalarioOferta(oferta.salario_oferta),
                    setDescripcionOferta(oferta.descripcion_oferta)
                    setRImagenOferta(oferta.referenciaIMG_oferta)
                    
                    const interesRelacionado = DatosIntereses.filter(INTERES => INTERES.id == oferta.intereses);
                    setInteresOfertaNombre(interesRelacionado.map(i => i.nombre_interes).join(', '))
                    
                    const EmpresaRelacionada = DatosUsers.filter(EMPRESA => EMPRESA.id == oferta.empresaUser);
                    setEmpresaOferta(EmpresaRelacionada.map(i => i.first_name).join(', '))
                    
                  })
                }
                
            } catch (error) {
            }
        };
    
        fetch();
    }, []);

    
    function exitDashboard() {
        navigate("/PrincipalPage")
    }



    function AplicarAEmpleo() {
      navigate("/aplicar")
    }

  return (
        <div>
          <button onClick={() => navigate("/PrincipalPage")}  className='SDM'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg> Volver          </button>


         
                  <div className='ContMainDetalles'>
                    <h2 className="titulo-oferta">{TituloOferta}</h2>

                    <div className="grid-detalles">
                      <div>
                        <div className="item"><span role="img" aria-label="dinero">💰</span> <b className='b'> Salario: </b> {SalarioOferta} </div><br />
                        <div className="item"><span role="img" aria-label="ubicación">📍</span> <b className='b'> Ubicación: </b> {UbicacionOferta}</div><br />
                        <div className="item"><span role="img" aria-label="área">🔲</span> <b className='b'> Área de trabajo: </b> {InteresOfertaNombre} </div><br />
                        
                        <div className="item">
                          <span role="img" aria-label="empresa"> 🏢 </span> <b className='bEmpresa'> Empresa: </b> <p className='PEmpresa'> {EmpresaOferta} </p>
                        </div>
                      </div>

                      <div>
                        <div className="item"><span role="img" aria-label="vacantes">🧮</span> <b className='b'> Vacantes: </b> {VacantesOferta}</div><br />
                        <div className="item"><span role="img" aria-label="perfil">👤</span> <b className='b'> Nombre del puesto: </b> {PuestoOferta}</div><br />
                        <div className="item"><span role="img" aria-label="fecha">🕒</span> <b className='b'> Fecha de publicación: </b> {new Date(FechaOferta).toLocaleDateString()} </div>
                      </div>
                    </div>

                    <div className="card-contenedor">
                      <h4> Descripción y requisitos: </h4>
                      <div className="descripcionOferta">
                        {DescripcionOferta}
                      </div>

                      {IsOferente && (
                        <div className="boton-Aplicar">
                          <button onClick={AplicarAEmpleo}> Aplicar </button>
                        </div>
                      )}
                    </div>

                  </div>

        </div>
  );
}

export default DetallesOfer;