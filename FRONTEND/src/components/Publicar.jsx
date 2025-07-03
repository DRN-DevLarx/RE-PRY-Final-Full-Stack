import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import InteresesServices from '../services/interesesServices';
import ofertasServices from '../services/ofertasServices';
import Swal from 'sweetalert2';
import GetCookie from '../services/GetCookie'
import cloudDinaryServices from '../services/cloudDinaryServices';

import '../styles/public.css';

function Publicar() {

  const navigate = useNavigate()

  const [Intereses, setIntereses] = useState([])
  const [ErrorIntereses, setErrorIntereses] = useState([])

  const [Ofertas, setOfertas] = useState([])
  const [ErrorOfertas, setErrorOfertas] = useState([])


  const [Titulo, setTitulo] = useState("")
  const [NombrePuesto, setNombrePuesto] = useState("")
  const [Nvacantes, setNvacantes] = useState("")
  const [Lugar, setLugar] = useState("")
  const [AreaTrabajo, setAreaTrabajo] = useState("")
  const [Salario, setSalario] = useState("")
  const [Descripcion, setDescripcion] = useState("")

  const IDEmpresa = GetCookie.getCookie("user_id")

  const [ImagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [VistaIMG, setVistaIMG] = useState(null);

  const [ImagenUrl, setImagenUrl] = useState("");


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

  
const CambioImagen = (e) => {
  const file = e.target.files[0];

  if (file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!validTypes.includes(file.type) || !validExtensions.includes(fileExtension)) {
      Swal.fire({
        icon: 'error',
        title: 'Formato no permitido',
        text: 'Solo se permiten archivos JPG, JPEG, PNG o WEBP.',

      });
      e.target.value = ''; // Limpia el input
      return;
    }

    setVistaIMG(URL.createObjectURL(file));
    setImagenSeleccionada(file);
  }
};


  const manejarEliminarImagen = () => {
    setVistaIMG(null);
    setImagenSeleccionada(null);
  };  
  
  
  function btnPublicar() {
      
    const validarCampos = (Titulo, NombrePuesto, Nvacantes, Lugar, AreaTrabajo, Salario, Descripcion) => {
      
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

      if (!ImagenSeleccionada) {
        Swal.fire({
          icon: "error",
          text: "Porfavor selecciona una imagen.",
          background: "#1a1a1a",
          color: "#ffffff",
          showConfirmButton: false,
          timer: 2000,
        });
        return false
      }
    
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
      return true;
    };

    const ValidarOfertaExistente = (NombrePuesto, Lugar, AreaTrabajo, IDEmpresa ) => {
    

      if (Ofertas.some((oferta) => oferta.nombre_puesto_oferta == NombrePuesto && oferta.ubicacion_oferta == Lugar && oferta.intereses == Number(AreaTrabajo) && oferta.empresa == Number(IDEmpresa) )) {
        Swal.fire({
          icon: "info",
          text: "La oferta ya existe. Porfavor verifica e intenta nuevamente.",
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

      if (
        ValidarOfertaExistente(NombrePuesto, Lugar, AreaTrabajo, IDEmpresa) &&
        validarCampos(Titulo, NombrePuesto, Nvacantes, Lugar, AreaTrabajo, Salario, Descripcion)
      ) {
        
        PostearOferta()
        
      }
    };

    ejecutarValidaciones();


    async function PostearOferta() {
            
      const uploadedUrl = await cloudDinaryServices.uploadImage(ImagenSeleccionada);
      
      console.log(uploadedUrl);
      
      if (uploadedUrl) {
        
        const obj_Oferta = {
          titulo_oferta: Titulo,
          nombre_puesto_oferta: NombrePuesto,
          intereses: Number(AreaTrabajo),
          vacantes_oferta: Number(Nvacantes),
          ubicacion_oferta: Lugar,
          salario_oferta: Salario,
          descripcion_oferta: Descripcion,
          referenciaIMG_oferta: uploadedUrl,
          estado_oferta: "activas",
          empresaUser: Number(IDEmpresa),
        }

        console.log("Objeto de oferta:", obj_Oferta);
        

        const respuestaServerOferta = await ofertasServices.PostOfertas(obj_Oferta);
  
        console.log("Respuesta del servidor:", respuestaServerOferta);
  
        if (respuestaServerOferta.status == 200 || respuestaServerOferta.status == 201) {
            Swal.fire({
                icon: "success",
                text: "Publicación exitosa.",
                background: "#1a1a1a",
                color: "#ffffff",
                showConfirmButton: false,
                timer: 1400,
            });
            setTimeout(() => {
              navigate("/PrincipalPage")
            }, 1500);
  
        } else {
            Swal.fire({
                icon: "error",
                text: "Hubo un problema al publicar la oferta.",
                background: "#1a1a1a",
                color: "#ffffff",
                showConfirmButton: true,
            });
        }
      }
      

    }
  }

  function Volver() {
    navigate("/PrincipalPage")
  }


  return (
    <div>
        <button onClick={Volver} className='SDM'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
          </svg> Volver
        </button>

      <div className="BodyPublicar">

        <div className='ContPP'>
          <h1>Publicar una oferta</h1>


          <div className='PublicarCont'>

            <div className="cuadro">

              <h3>Selecciona una imagen</h3>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  {!VistaIMG ? (
                    <label 
                      htmlFor="imageInput" className='imginp'>
                        
                      Seleccionar imagen
                      <input id="imageInput" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => CambioImagen(e)} 
                      />
                    </label>
                  ) : (
                    <div style={{ position: "relative" }}>

                      <img src={VistaIMG} alt="Vista previa" className='vistp'/>

                      <button onClick={manejarEliminarImagen} className='bntelimens'> ✖ </button>
                    </div>
                  )}
                  <br />
                </div>

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
                  <option value="Puntarenas">Puntarenas</option>
                  <option value="Pitahaya">Pitahaya</option>
                  <option value="Chomes">Chomes</option>
                  <option value="Barranca">Barranca</option>
                  <option value="chacarita">Chacarita</option>
                  <option value="Acapulco">Acapulco</option>
                  <option value="Arancibia">Arancibia</option>
                  <option value="Espiritu_santo">Espíritu Santo</option>
                  <option value="San_Juan_grande">San Juan Grande</option>
                  <option value="Macacona">Macacona</option>
                  <option value="San_Rafael">San Rafael</option>
                  <option value="San_Jeronimo">San Jerónimo</option>
                  <option value="Miramar">Miramar</option>
                  <option value="La_Union">La Unión</option>
                  <option value="San_Isidro">San Isidro</option>
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



              <h3>Descripción general y requisitos</h3>
              <textarea value={Descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción general y requisitos" rows="5"></textarea>

              <div className='btnpublic'>
                <button onClick={btnPublicar}> Publicar</button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Publicar;

