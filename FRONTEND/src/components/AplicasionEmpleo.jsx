import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/AplicasionEmpleo.css';
import Swal from "sweetalert2";
import PostulacionesServices from '../services/PostulacionesServices';

import GetCookie from '../services/GetCookie';
import cloudDinaryServices from '../services/cloudDinaryServices';

const AplicacionEmpleo = () => {
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [archivoPDF, setArchivoPDF] = useState(null);
  const [comentario, setComentario] = useState('');
  const [Postulaciones, setPostulaciones] = useState('');

  const navigate = useNavigate();

  const userid  = GetCookie.getCookie("user_id");
  const idOferta = GetCookie.getCookie("IdOferta");

  useEffect(() => {
      const fetch = async () => {
          try {
            const DatosPostulaciones = await PostulacionesServices.GetPostulaciones();
            if (DatosPostulaciones) setPostulaciones(DatosPostulaciones);
          } catch (error) {
            console.log("Error al obtener datos de postulaciones:", error);
          }
      };
      fetch();
  }, []);

  const manejarCambioArchivo = (e) => {
    const archivoSeleccionado = e.target.files[0];
    if (!archivoSeleccionado) return;

    if (archivoSeleccionado.type !== 'application/pdf') {
      setArchivoPDF(null);
      setPdfPreviewUrl(null);
      Swal.fire({
        icon: 'error',
        title: 'Archivo inválido',
        text: 'Por favor, selecciona un archivo PDF.',
        confirmButtonColor: '#2ae2b6',
        background: '#1a1a1a',
        color: '#fff',
        iconColor: 'red'
      });
    } else {
      setArchivoPDF(archivoSeleccionado);
      setPdfPreviewUrl(URL.createObjectURL(archivoSeleccionado));
    }
  };

  const manejarCerrarFormulario = () => {
    Swal.fire({
      icon: 'question',
      title: '¿Deseas cerrar el formulario?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#2ae2b6',
      background: '#1a1a1a',
      color: '#fff',
      iconColor: '#2ae2b6'
    }).then((resultado) => {
      if (resultado.isConfirmed) navigate("/detallesOferta");
    });
  };

  const manejarEnvioFormulario = async (e) => {
    e.preventDefault();

    const PostulacionEncontrada = Postulaciones.some(
      (dato) => dato.oferta === idOferta && dato.user === userid
    );

    if (PostulacionEncontrada) {
      Swal.fire({
        icon: 'warning',
        title: 'Ya has postulado',
        text: 'Ya has enviado una solicitud para esta oferta.',
        confirmButtonColor: '#2ae2b6',
        background: '#1a1a1a',
        color: '#fff',
        iconColor: '#ffcc00',
      });
      return;
    }

    if (!archivoPDF) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta archivo',
        text: 'Debes subir un archivo PDF.',
        confirmButtonColor: '#2ae2b6',
        background: '#1a1a1a',
        color: '#fff',
        iconColor: '#ffcc00',
      });
      return;
    }

    // Spinner de carga mientras se sube el archivo
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      background: 'rgba(0,0,0,0.1)',
      backdrop: 'rgba(0,0,0,0.3)',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div class="swal2-spinner"></div>
          <p style="margin-top: 10px; font-size: 14px; color: #555;">Cargando...</p>
        </div>
      `,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const UrlPDF = await cloudDinaryServices.uploadImage(archivoPDF);

    if (!UrlPDF) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error al subir PDF',
        text: 'No se pudo subir el archivo PDF.',
        confirmButtonColor: '#2ae2b6',
        background: '#1a1a1a',
        color: '#fff',
        iconColor: 'red',
      });
      return;
    }

    const ObjPostulaciones = {
      user: userid,
      oferta: idOferta,
      comentario: comentario,
      referenciaPDF: UrlPDF,
    };

    const RespaPostPostulaciones = await PostulacionesServices.PostPostulacion(ObjPostulaciones);

    Swal.close();

    if (!RespaPostPostulaciones) {
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar solicitud',
        text: 'No se pudo enviar tu solicitud. Inténtalo de nuevo más tarde.',
        confirmButtonColor: '#2ae2b6',
        background: '#1a1a1a',
        color: '#fff',
        iconColor: 'red',
      });
      return;
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Solicitud enviada',
        text: 'Tu solicitud ha sido enviada con éxito.',
        confirmButtonColor: '#2ae2b6',
        background: '#1a1a1a',
        color: 'white',
        iconColor: '#2ae2b6',
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate('/PrincipalPage');
      }, 2000);
    }
  };

  return (
    <div className="contenedor-modal">
      <div className="caja-modal">
        <button className="boton-cierre" onClick={manejarCerrarFormulario}>✖️</button>
        <h2 className="titulo-modal"><em>Aplicar al empleo</em></h2>

        <label className="etiqueta-comentario"><em>Comentario:</em></label>
        <textarea
          className="area-comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        ></textarea>

        <form onSubmit={manejarEnvioFormulario}>
          <label className="etiqueta-subida">
            <input
              type="file"
              accept="application/pdf"
              onChange={manejarCambioArchivo}
            />Subir PDF
          </label>

          {pdfPreviewUrl && (
            <div className="contenedor-pdf">
              <iframe src={`${pdfPreviewUrl}#toolbar=0&navpanes=0&scrollbar=0`} title="Vista previa del PDF" width="100%" height="250px" style={{ border: 'none' }}></iframe>
            </div>
          )}

          <button className="boton-envio">Enviar solicitud</button>
        </form>
      </div>
    </div>
  );
};

export default AplicacionEmpleo;
