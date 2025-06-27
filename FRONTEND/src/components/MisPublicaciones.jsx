import React, {useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';

import InteresesServices from '../services/interesesServices';
import OfertasServices from '../services/ofertasServices';
import usersServices from '../services/usersServices';

import cloudDinaryServices from '../services/cloudDinaryServices';
import GetCookie from '../services/GetCookie';

import { CerrarDashboard } from './CerrarDashboard';
import Swal from 'sweetalert2';

import "../styles/Publicaciones.css"

function Publicaciones() {

  const navigate = useNavigate();

  const idUserCookie = GetCookie.getCookie("user_id")
  
  const [Intereses, setIntereses] = useState([]);

  const [Ofertas, setOfertas] = useState([]);

  const [Users, setUsers] = useState([]);

  const [ContDetalles, setContDetalles] = useState(false)
  const [EditarInfo, setEditarInfo] = useState(false)

  const [FiltroAreaTrabajo, setFiltroAreaTrabajo] = useState()
  const [FiltroUbicacion, setFiltroUbicacion] = useState("")
  const [FiltroSalario, setFiltroSalario] = useState("")
  const [FiltroEstado, setFiltroEstado] = useState("")
  const [FiltroInput, setFiltroInput] = useState("")

  const [IsActivo, setIsActivo] = useState(true);
  const [EmpresaDeOfertaSeleccionada, setEmpresaDeOfertaSeleccionada] = useState()
  const [IDOferta, setIDOferta] = useState()
  const [EstadoOferta, setEstadoOferta] = useState("")

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
  const [RImagenOferta, setRImagenOferta] = useState(null)

  let imgASubir = null;

  const palabrasProhibidas = [
    "admin", "superuser", "password", "puta", "putas", "madre","pendejo", "mierda", "caca", "culo", "verga", "coño",
    "chingar", "pendeja", "puto", "cabrón", "cabron", "gilipollas", "maricón", "bollera", "zorra", "pene",  
    "putón", "pendejita", "pendejito","prostituta", "prostituto", "putas", "putos", "pendejos", "pendejas", 
    "cago", "cagó", "cagada", "cagado", "cagarse", "cagón", "cagones", "cagar", "cagando", "como", "vagina", 
    "putita", "meto", "cojo", "cojer"];


  useEffect(() => {
      const fetch = async () => {
        const DatosIntereses = await InteresesServices.GetIntereses();
        const DatosOfertas = await OfertasServices.GetOfertas();
        const DatosUsers = await usersServices.GetUser();

        if(EstadoOferta == "desactiva") {
          setIsActivo(false)
        }

        if (DatosIntereses && DatosOfertas && DatosUsers) {
          setIntereses(DatosIntereses);
          setOfertas(DatosOfertas);
          setUsers(DatosUsers);
          
                          
          DatosOfertas.filter((dato) => dato.id == IDOferta).map((oferta) => {
                                        

            setTituloOferta(oferta.titulo_oferta),
            setPuestoOferta(oferta.nombre_puesto_oferta),
            
            setVacantesOferta(oferta.vacantes_oferta),
            setUbicacionOferta(oferta.ubicacion_oferta),
            setFechaOferta(oferta.fecha_oferta)
            
            setSalarioOferta(oferta.salario_oferta),
            setDescripcionOferta(oferta.descripcion_oferta)
            setRImagenOferta(oferta.referenciaIMG_oferta)
              
            setInteresOfertaID(oferta.intereses)
            setEmpresaDeOfertaSeleccionada(oferta.empresaUser)

            const interesRelacionado = DatosIntereses.filter(INTERES => INTERES.id == oferta.intereses);
            setInteresOfertaNombre(interesRelacionado.map(i => i.nombre_interes).join(', '))

            const EmpresaRelacionada = DatosUsers.filter(EMPRESA => EMPRESA.id == oferta.empresaUser);
            setEmpresaOferta(EmpresaRelacionada.map(i => i.first_name).join(', '))

          })

        }
      
      };
  
      fetch();
  
  }, [EstadoOferta]);


  function VerDetallesOferta(id, estado) {
    setContDetalles(true)
    setIDOferta(id)
    setEstadoOferta(estado)
  }
  
  function exitDashboard() {
    CerrarDashboard(navigate)
  }

  function filtrarOfertas(Ofertas, FiltroAreaTrabajo, FiltroUbicacion, FiltroSalario, FiltroEstado, FiltroInput) {
    // Si todos los filtros están vacíos, devuelve la lista completa
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

  // Llamada a la función
  let Filtrado = filtrarOfertas(Ofertas, FiltroAreaTrabajo, FiltroUbicacion, FiltroSalario, FiltroEstado, FiltroInput);
  
  function Volver() {
    setContDetalles(false)
  }

  function Volver2() {
    setContDetalles(true)
    setEditarInfo(false)
  }

  function EditarOferta() {
    setContDetalles(false)
    setEditarInfo(true)

  }

  async function DesactivarOferta() {
  
    Swal.fire({
        icon: "question",
        iconColor: "#2ae2b6",
        text: "¿Deseas desactivar esta oferta?",
        confirmButtonColor: "#9ACD32",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Sí, desactivar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then(async (result) => {

        if (result.isConfirmed) {
            const obj = {
              estado_oferta: "desactiva",
            }

            const PutOferta = await OfertasServices.PutOfertas(IDOferta, obj)

            if(PutOferta) {
                Swal.fire({
                    icon: "success",
                    iconColor: "#2ae2b6",
                    text: "La oferta ha sido desactivada con exito.",
                    showConfirmButton: false,
                    background: "#1a1a1a",
                    color: "#ffffff",
                    timer: 1500,
                })
                setIsActivo(false)

                setTimeout(() => {
                  location.reload()                  
                }, 1600);
            }
        }
    });

  }

  async function ActivarOferta() { 

    Swal.fire({
        icon: "question",
        iconColor: "#2ae2b6",
        text: "¿Deseas Activar esta oferta?",
        confirmButtonColor: "#9ACD32",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Sí, Activar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then(async (result) => {

        if (result.isConfirmed) {
            const obj = {
              estado_oferta: "activas",
            }

            const PutOferta = await OfertasServices.PutOfertas(IDOferta, obj)

            if(PutOferta) {
                Swal.fire({
                    icon: "success",
                    iconColor: "#2ae2b6",
                    text: "La oferta ha sido activada con exito.",
                    showConfirmButton: false,
                    background: "#1a1a1a",
                    color: "#ffffff",
                    timer: 1500,
                })
                setIsActivo(true)

                setTimeout(() => {
                  location.reload()
                }, 1600);
            }
        }
    });
  }

  async function EliminarOferta() {
  
      Swal.fire({
          icon: "question",
          iconColor: "#2ae2b6",
          text: "¿Deseas eliminar permanentemente esta oferta?",
          confirmButtonColor: "#DC143C",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonText: "Sí, eliminar",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
      }).then(async (result) => {

          if (result.isConfirmed) {

              const DeleteOfert = await OfertasServices.DeleteOfertas(IDOferta);
              
              if(DeleteOfert) {
                  Swal.fire({
                      icon: "success",
                      iconColor: "#2ae2b6",
                      text: "La oferta ha sido eliminada con exito.",
                      showConfirmButton: false,
                      background: "#1a1a1a",
                      color: "#ffffff",
                      timer: 1500,
                  })
                  setTimeout(() => {
                    location.reload()                    
                  }, 1600);
              }
          }
      });
  }

  function GuardarCambios() {
      ejecutarValidaciones();
  }

  const validarCampos = (TituloOferta, SalarioOferta, UbicacionOferta, InteresOfertaNombre, VacantesOferta, PuestoOferta, DescripcionOferta) => { 
    if (![TituloOferta, SalarioOferta, UbicacionOferta, InteresOfertaNombre, toString(VacantesOferta), PuestoOferta, DescripcionOferta].every(campo => campo.trim() != "")) {
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
    else if(Number(VacantesOferta) <= 0) {
      Swal.fire({
        icon: "error",
        text: "Por favor, ingresa una cantidad de vacantes válida.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Verificar",
      });
      return false;
    }
    else if(PuestoOferta.length < 5) {
      Swal.fire({
        icon: "error",
        text: "El nombre del puesto debe tener al menos 5 carácteres.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Verificar",
      });
      return false;
    }

    return true;
  }

  const validarPalabrasProhibidas = (TituloOferta, PuestoOferta, DescripcionOferta) => {

    if (palabrasProhibidas.some((palabra) => TituloOferta.toLowerCase().includes(palabra))) {
      Swal.fire({
          icon: "error",
          text: "El titúlo incluye información prohíbida, por favor verifica e intenta nuevamente.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonText: "Verificar",
      });
      return false;
    }
    else if (palabrasProhibidas.some((palabra) => PuestoOferta.toLowerCase().includes(palabra))) {
      Swal.fire({
          icon: "error",
          text: "El nombre del puesto incluye información prohíbida, por favor verifica e intenta nuevamente.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonText: "Verificar",
      });
      return false;
    }
    else if (palabrasProhibidas.some((palabra) => DescripcionOferta.toLowerCase().includes(palabra))) {
      Swal.fire({
          icon: "error",
          text: "La descripción incluye información prohíbida, por favor verifica e intenta nuevamente.",
          confirmButtonColor: "#2ae2b6",
          background: "#1a1a1a",
          color: "#ffffff",
          confirmButtonText: "Verificar",
      });
      return false;
    }

    return true;
  };

  const ValidarOfertaExistente = (EmpresaDeOfertaSeleccionada) => {
  
    const OfertaEncontrada = Ofertas.find((OfertaFind) => OfertaFind.empresaUser == EmpresaDeOfertaSeleccionada)
    
    if (Ofertas.some((OFE) => OFE == OfertaEncontrada && OFE.titulo_oferta == TituloOferta && OFE.ubicacion_oferta == UbicacionOferta && OFE.intereses == InteresOfertaID)) {
      
      Swal.fire({
        icon: "error",
        text: "La oferta ya existe, por favor verifica la información e intenta de nuevo.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Verificar",
        });
        return false;
    }
    return true;
  };

  const ValidarImagen = async () => {
    
    const leerArchivo = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    };
    let IMGTemporal = null;
    
    const result = await Swal.fire({
      title: 'Click para cambiar imagen',
      background: "#1a1a1a",
      color: "#ffffff",
      confirmButtonColor: "#2ae2b77b",
      confirmButtonText: "Continuar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      html: `
        <input type="file" id="fileInput" accept="image/*" style="display:none" />
        <div id="customUpload" style="
          margin: auto;
          width: 80%;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed #ccc;
          cursor: pointer;
        ">
        <img id="customUploadIcon" src=${RImagenOferta} alt="Subir imagen" style="max-width: 90%; max-height: 90%; margin-bottom: 10px;">
          <img id="imgPreview" style="display:none; max-width:90%; max-height:90%;" />
        </div>
      `,
      didOpen: () => {
        const fileInput = document.getElementById('fileInput');
        const customUpload = document.getElementById('customUpload');
        const customUploadIcon = document.getElementById('customUploadIcon');
        const imgPreview = document.getElementById('imgPreview');

        customUpload.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', async () => {
          const file = fileInput.files[0];
          if (file) {
            const tiposPermitidos = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
            if (!tiposPermitidos.includes(file.type)) {
              Swal.showValidationMessage('Formato no permitido. Usá JPG, PNG o WEBP.');
              fileInput.value = '';
              return;
            }

            Swal.resetValidationMessage();
            const src = await leerArchivo(file);
            imgPreview.src = src;
            imgPreview.style.display = 'block';
            customUploadIcon.style.display = 'none';
            IMGTemporal = file;
            
            imgASubir = file;
            
          }
        });
      }
    });

    if (result.isConfirmed) {
      
      if (IMGTemporal) {
        return true;
      }
      return true;
    }

    return false; 
  };

  async function ValidarContrasena() {
    const result = await Swal.fire({
      icon: "info",
      title: "Ingresa tu contraseña",
      confirmButtonColor: "#2ae2b6",
      background: "#1a1a1a",
      color: "#ffffff",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Contraseña" type="password">
        <input id="swal-input2" class="swal2-input" placeholder="Confirmar Contraseña" type="password">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ];
      }
    });

    if (!result.isConfirmed) return false;

    const [pass1, pass2] = result.value;

    if (!pass1 || !pass2) {
      await Swal.fire({
        icon: "error",
        iconColor: "#2ae2b6",
        text: "Digita tu contraseña.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Digitar",
      });
      return false;
    }

    if (pass1 !== pass2) {
      await Swal.fire({
        icon: "error",
        iconColor: "#2ae2b6",
        text: "Las contraseñas no coinciden. Por favor verifica e intenta nuevamente.",
        confirmButtonColor: "#2ae2b6",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonText: "Verificar",
      });
      return false;
    }

    // 🔐 Validación real contra backend
    const esValida = await VContraseña(pass1);
    return esValida;
  }

  async function VContraseña (contrAdmin) {
    
    const UserFind = Users.find(user => user.id == idUserCookie);
    const UsernameFind = UserFind.username

    const credentials = {
        username: UsernameFind,
        password: contrAdmin,
    }; 

    console.log(credentials);

    const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });

    if (response.ok === false) {
        Swal.fire({
            icon: "error",
            text: "La contraseña es incorrecta. Porfavor intenta más tarde",
            background: "#1a1a1a",
            color: "#ffffff",
            showConfirmButton: false,
            timer: 3000,
        });
        
        return false
        
    }
    else {      
      console.log("Correcta");
                    
      return true           
    }
  }

  async function ejecutarValidaciones() {
    
      if (validarCampos(TituloOferta, SalarioOferta, UbicacionOferta, InteresOfertaNombre, VacantesOferta, PuestoOferta, DescripcionOferta) &&
        validarPalabrasProhibidas(TituloOferta, PuestoOferta, DescripcionOferta) &&
        ValidarOfertaExistente(EmpresaDeOfertaSeleccionada) &&
        await ValidarImagen()
      ) {

        const ContraEsValida = await ValidarContrasena()

        if (ContraEsValida) {
          console.log(imgASubir);
          
          ActualizarDatos()
        }
        
                    
      }
  }

  async function ActualizarDatos() {

    let uploadedUrl = null;
    let NuevaIMG = false

    let respuestaUpdateData = null;

    if (imgASubir != null) {
      uploadedUrl = await cloudDinaryServices.uploadImage(imgASubir);
      NuevaIMG = true;
      
    } else {
      NuevaIMG = false;
    }
    
    if (NuevaIMG) {
      const UpdateData = {
          titulo_oferta: TituloOferta,
          salario_oferta: SalarioOferta,
          ubicacion_oferta: UbicacionOferta,
          intereses: InteresOfertaID,
          vacantes_oferta: VacantesOferta,
          nombre_puesto_oferta: PuestoOferta,
          descripcion_oferta: DescripcionOferta,
          referenciaIMG_oferta: uploadedUrl,
      }
      
      respuestaUpdateData = await OfertasServices.PutPatcOfertas(IDOferta, UpdateData);
      
    }
    else {
      const UpdateData = {
        titulo_oferta: TituloOferta,
        salario_oferta: SalarioOferta,
        ubicacion_oferta: UbicacionOferta,
        intereses: InteresOfertaID,
        vacantes_oferta: VacantesOferta,
        nombre_puesto_oferta: PuestoOferta,
        descripcion_oferta: DescripcionOferta,
      }
      respuestaUpdateData = await OfertasServices.PutPatcOfertas(IDOferta, UpdateData);

    }

    if(respuestaUpdateData) {
      Swal.fire({
          icon: "success",
          text: "Información actualizada con exito.",
          background: "#1a1a1a",
          color: "#ffffff",
          showConfirmButton: false,
          timer: 1000,
      })

      setTimeout(() => {
          location.reload()
      }, 1100);
    }
    else {
      Swal.fire({
        icon: "error",
        text: "Hubo un problema al guardar los cambios.",
        background: "#1a1a1a",
        color: "#ffffff",
        showConfirmButton: true,
      });
    }

  }
  
  return (
    <div id='ContPerfilAdmin'>

      {!ContDetalles && !EditarInfo && (
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
                              
                {Filtrado.map((oferta, index) => {
                  let interesesRelacionados = Intereses.filter(INTERES => INTERES.id == oferta.intereses);

                  let statusOferta = oferta.estado_oferta === "desactiva" ? "statusDesactiva" : "StatusActiva";

                  return (
                    <article className={statusOferta} onClick={() => VerDetallesOferta(oferta.id, oferta.estado_oferta)} key={index}>
                      <h3>{oferta.titulo_oferta}</h3>
                      <img className='imgOfertaAdmin' src={oferta.referenciaIMG_oferta} alt="Imagen de oferta"/>
                      <p><b>Área de trabajo: </b>{interesesRelacionados.map(i => i.nombre_interes).join(', ')}</p>
                      <p><b>Vacantes: </b>{oferta.vacantes_oferta}</p>
                      <p><b>Ubicación: </b>{oferta.ubicacion_oferta}</p>
                      <p><b>Fecha de Publicación:</b> {new Date(oferta.fecha_oferta).toLocaleDateString()}</p>
                    </article>
                  );
                })}
              </div>


            </div>
          </div>
        </div>
      )}

      {ContDetalles && !EditarInfo && (
        
        <div>
          <button onClick={Volver}  className='SDM'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg> Volver
          </button>


          <div className='SectionDetallesAdmin'>
  
                       
                  <div className='ContMainDetallesAdmin'>
                    <h2 className="titulo-ofertaAdmin">{TituloOferta}</h2>

                    <div className="grid-detallesAdmin">
                      <div>
                        <div className="item"><span role="img" aria-label="dinero">💰</span> <b className='b'> Salario: </b> {SalarioOferta} </div><br />
                        <div className="item"><span role="img" aria-label="ubicación">📍</span> <b className='b'> Ubicación: </b> {UbicacionOferta}</div><br />
                        <div className="item"><span role="img" aria-label="área">🔲</span> <b className='b'> Área de trabajo: </b> {InteresOfertaNombre}</div><br />
                        
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

                    <div className="card-contenedorAdmin">
                      <h4> Descripción y requisitos: </h4>
                      <div className="descripcionOferta">
                        {DescripcionOferta}
                      </div>
                    </div>

                    <div className='contbtnAcciones'>
                        <button className='BtnEditar' onClick={(e) => EditarOferta()} >Editar</button>

                        {IsActivo && (
                            <button className='BtnDesactivar' onClick={(e) => DesactivarOferta()} >Desactivar</button>
                        )}

                        {!IsActivo && (
                            <button className='BtnActivar' onClick={(e) => ActivarOferta()} >Activar</button>
                        )}

                        <button className='BtnEliminar' onClick={(e) => EliminarOferta()} >Eliminar</button>
                    </div>
                  </div>

          </div>
        </div>

      )}

      {EditarInfo && (
        <div>
          <button onClick={Volver2} className='SDM'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2ae2b6" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </svg> Volver
          </button>

          <div className='SectionDetallesAdmin'>
            
            <div className='ContMainDetallesAdmin'>
              <h2 align="center">
                <input className="titulOfertaEdit" type="text" value={TituloOferta} onChange={(e) => setTituloOferta(e.target.value)} />
              </h2><br />

              <div className="grid-detallesAdmin2">
                <div>
                  <div className="item"><span role="img" aria-label="dinero">💰</span> 
                    <b className='b'> Salario: </b> 
                    <select value={SalarioOferta} onChange={(e) => setSalarioOferta(e.target.value)} className='selectPublicar' name="salario">
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
                  </div>

                  <div className="item"><span role="img" aria-label="ubicación">📍</span> 
                    <b className='b'> Ubicación: </b>                
                    <select value={UbicacionOferta} onChange={(e) => setUbicacionOferta(e.target.value)} className='selectPublicar' name="distritos_cercanos">
                      <option value="">Ubicación</option>
                      <option value="Puntarenas">Puntarenas</option>
                      <option value="Pitahaya">Pitahaya</option>
                      <option value="Chomes">Chomes</option>
                      <option value="Barranca">Barranca</option>
                      <option value="Chacarita">Chacarita</option>
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
                  </div>

                  <div className="item"><span role="img" aria-label="área">🔲</span> 
                    <b className='b'> Área de trabajo: </b>

                    <select value={InteresOfertaID} onChange={(e) => setInteresOfertaID(e.target.value) } className='selectPublicar'>
                        <option value="">Área de trabajo</option>
                      {Intereses.map((interes, index) => (
                          <option key={index} value={interes.id}>
                            {interes.nombre_interes}
                        </option>
                      ))}
                    </select>

                  </div>
                </div>

                <div>
                  <div className="item"><span role="img" aria-label="vacantes">🧮</span> 
                    <b className='b'> Vacantes: </b>
                    <input className='inputEditOfertas' type="text" value={VacantesOferta} onChange={(e) => setVacantesOferta(e.target.value)} />
                  </div><br />

                  <div className="item"><span role="img" aria-label="perfil">👤</span>
                    <b className='b'> Nombre del puesto: </b> 
                    <input className='inputEditOfertas' type="text" value={PuestoOferta} onChange={(e) => setPuestoOferta(e.target.value)} />
                  </div>
                </div>

              </div><br />
                      
              <div className="card-contenedorAdmin">
                <h4> Descripción y requisitos: </h4>

                <textarea className='descripcionOfertaTextarea' value={DescripcionOferta} onChange={(e) => setDescripcionOferta(e.target.value)} > </textarea>
              </div>
                
              <div className='contbtnEditar' style={{ textAlign: "right", width: "95%" }}>
                  <button onClick={GuardarCambios} >Guardar Cambios</button>
              </div>
            </div>
          </div>
          
        </div>
      )}

    </div>
  );
}

export default Publicaciones;
