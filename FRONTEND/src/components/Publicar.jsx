import React, { useState, useEffect } from 'react';
import '../styles/public.css';

import InteresesServices from '../services/interesesServices';
import ofertasServices from '../services/ofertasServices';

import SubirIMG from './SubirIMG';
import Swal from 'sweetalert2';

function Publicar() {

  const [Intereses, setIntereses] = useState([])
  const [ErrorIntereses, setErrorIntereses] = useState([])

  const [Ofertas, setOfertas] = useState([])
  const [ErrorOfertas, setErrorOfertas] = useState([])


  const [Titulo, setTitulo] = useState("")
  const [NombrePuesto, setNombrePuesto] = useState("")
  const [Nvacantes, setNvacantes] = useState()
  const [Lugar, setLugar] = useState("")
  const [AreaTrabajo, setAreaTrabajo] = useState("")
  const [Salario, setSalario] = useState("")
  const [Descripcion, setDescripcion] = useState("")

  const palabrasProhibidas = [
    "admin", "superuser", "password", "puta", "madre","pendejo", "mierda", "caca", "culo", "verga", "coño",
    "chingar", "pendeja", "puto", "cabrón", "cabron", "gilipollas", "maricón", "bollera", "zorra", "pene",  
    "putón", "pendejita", "pendejito","prostituta", "prostituto", "putas", "putos", "pendejos", "pendejas", 
    "cago", "cagó", "cagada", "cagado", "cagarse", "cagón", "cagones", "cagar", "cagando", "como", "vagina", 
    "putita", "meto", "cojo", "cojer"];

   useEffect(() => {
        let isMounted = true;
        const fetch = async () => {
            try {
                const DatosIntereses = await InteresesServices.GetIntereses();
                const DatosOfertas = await ofertasServices.GetOfertas();

  
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


  function btnPublicar() {
      
    const validarCampos = (Titulo, NombrePuesto, Nvacantes, Lugar, AreaTrabajo, Salario, Descripcion) => {
      
      if (Nvacantes <= 0) {
        Swal.fire({
          icon: "error",
          text: "Por favor, digita un número de vacantes válido.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          timer: 3000,
          showConfirmButton: false,
        });
        return false;
      }

      if (![Titulo, NombrePuesto, Nvacantes, Lugar, AreaTrabajo, Salario, Descripcion].every(campo => campo.trim() !== "")) {

        Swal.fire({
          icon: "error",
          text: "Por favor, completa todos los campos.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonText: "Verificar",
        });
        return false;
      }
      return true;
    };

    const ValidarOfertaExistente = (NombrePuesto, Lugar, AreaTrabajo) => {
      
            
      // Aqui falta validar el interes y el id de la empresa
      
      if (Ofertas.some((oferta) => oferta.nombre_puesto_oferta == NombrePuesto && oferta.ubicacion_oferta == Lugar && oferta.intereses == AreaTrabajo)) {
        Swal.fire({
          icon: "info",
          text: "La oferta ya existe. Porfavor verifica e intenta nuevamente",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonText: "Verificar",
        });
        return false;
      }
      console.log("No pasooo");
      
      return true;
    };

    const validarPalabrasProhibidas = (datos) => {
      if (palabrasProhibidas.some((palabra) => datos.some((dato) => dato.toLowerCase().includes(palabra)))) {
        Swal.fire({
          icon: "error",
          text: "Un campo contiene información no permitida, por favor verifica e intenta nuevamente.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonText: "Verificar",
        });
        return false;
      }
      return true;
    };


    const ejecutarValidaciones = () => {
      const datosUsuario = [Titulo, NombrePuesto, Nvacantes, Lugar, AreaTrabajo, Salario, Descripcion];

      if (
        ValidarOfertaExistente(NombrePuesto, Lugar, AreaTrabajo) &&
        validarCampos(Titulo, NombrePuesto, Nvacantes, Lugar, AreaTrabajo, Salario, Descripcion) &&
        validarPalabrasProhibidas(datosUsuario)
      ) {
        console.log("Pasooo");
        
          // PostearOferta()
        
      }
    };

  ejecutarValidaciones();

  async function PostearOferta() {
    

    const obj_Oferta = {
      titulo_oferta: Titulo,
      nombre_puesto_oferta: NombrePuesto,
      intereses: AreaTrabajo,
      vacantes_oferta: Nvacantes,
      ubicacion_oferta: Lugar,
      salario_oferta: Salario,
      descripcion_oferta: Descripcion,
      referenciaIMG_oferta: "imagen.png",
      estado_oferta: "activa",
      empresa: 3,

    }

    console.log(obj_Oferta);
    

    const respuestaServerOferta = await ofertasServices.PostOfertas(obj_Oferta)

    console.log(respuestaServerOferta);

  }



  





  }


  return (
    <div className="BodyPublicar">

      <div className='ContPP'>
        <h1>Publicar una oferta</h1>


        <div className='PublicarCont'>

          <div className="cuadro">

            <h3>Selecciona una imagen</h3>
            <SubirIMG/>

            <h3>Titulo de la oferta</h3>
            <input value={Titulo} onChange={(e) => setTitulo(e.target.value)} type="text" placeholder="Ej: Se busca Programador Full Stack en Chacarita" />

            <h3>Nombre del puesto vacante</h3>
            <input value={NombrePuesto} onChange={(e) => setNombrePuesto(e.target.value)} type="text" placeholder="Ej: Programador Full Stack" />

            <h3>Cantidad de vacantes</h3>
            <input value={Nvacantes} onChange={(e) => setNvacantes(e.target.value)} type="number" placeholder="Ej: 1" />
          </div>
          <div className="cuadro">


            <h3>Lugar</h3>
            <select value={Lugar} onChange={(e) => setLugar(e.target.value)} className='selectPublicar' name="distritos_cercanos">
              <option value="">Selecciona el lugar</option>
              <option value="puntarenas">Puntarenas</option>
              <option value="pitahaya">Pitahaya</option>
              <option value="chomes">Chomes</option>
              <option value="barranca">Barranca</option>
              <option value="chacarita">Chacarita</option>
              <option value="acapulco">Acapulco</option>
              <option value="arancibia">Arancibia</option>
              <option value="espiritu_santo">Espíritu Santo</option>
              <option value="san_juan_grande">San Juan Grande</option>
              <option value="macacona">Macacona</option>
              <option value="san_rafael">San Rafael</option>
              <option value="san_jeronimo">San Jerónimo</option>
              <option value="miramar">Miramar</option>
              <option value="la_union">La Unión</option>
              <option value="san_isidro">San Isidro</option>
            </select>
          
            <h3>Área de trabajo</h3>
            <select value={AreaTrabajo} onChange={(e) => setAreaTrabajo(e.target.value) } className='selectPublicar'>
                  <option value="">Seleciona el área de trabajo</option>
                {Intereses.map((interes, index) => (
                    <option key={index} value={interes.id}>
                      {interes.nombre_interes}
                      </option>
                ))}
                  </select>

            <h3>Salario</h3>

            <select value={Salario} onChange={(e) => setSalario(e.target.value) } className='selectPublicar' name="salario">
                <option value="">Selecciona el rango de salario</option>
                <option value="100-300">₡100,000 - ₡300,000</option>
                <option value="300-500">₡300,000 - ₡500,000</option>
                <option value="500-700">₡500,000 - ₡700,000</option>
                <option value="700-900">₡700,000 - ₡900,000</option>
                <option value="900-1100">₡900,000 - ₡1,100,000</option>
                <option value="1100-1300">₡1,100,000 - ₡1,300,000</option>
                <option value="1300-1600">₡1,300,000 - ₡1,600,000</option>
                <option value="1600-2000">₡1,600,000 - ₡2,000,000</option>
                <option value="2000-2500">₡2,000,000 - ₡2,500,000</option>
                <option value="2500-3000">₡2,500,000 - ₡3,000,000</option>
            </select>



            <h3>Descripción general y requisitos</h3>
            <textarea value={Descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción general y requisitos" rows="5"></textarea>

            <div className='btnpublic'>
              <button onClick={btnPublicar}> Publicar</button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Publicar;

