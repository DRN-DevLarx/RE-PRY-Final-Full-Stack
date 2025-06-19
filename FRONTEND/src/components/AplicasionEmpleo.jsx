import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import '../styles/AplicasionEmpleo.css';
import Swal from "sweetalert2";

const AplicacionEmpleo = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');

  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setFile(null);
      setFileUrl(null);
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
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleClose = () => {
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
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate("/")          Averiguar a quien pertenece para agregar el vinculo.
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta archivo',
        text: 'Debes subir un archivo PDF.',
        confirmButtonColor: '#2ae2b6',
        background: '#1a1a1a',
        color: '#fff',
        iconColor: '#ffcc00'
      });
      return;
    }

    if (comment.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Falta comentario',
        text: 'Por favor escribe un comentario antes de enviar.',
        confirmButtonColor: '#2ae2b6',
        background: '#1a1a1a',
        color: '#fff',
        iconColor: '#ffcc00'
      });
      return;
    }

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

    // Aquí puedes reiniciar el formulario o hacer una petición a backend
    setFile(null);
    setFileUrl(null);
    setComment('');
  };

  return (
    <div className="modal-container">
      <div className="modal-box">
        <button className="close-btn" onClick={handleClose}>X</button>
        <h2 className="modal-title"><em>Aplicar al empleo</em></h2>

        <label className="comment-label"><em>Comentario:</em></label>
        <textarea
          className="comment-box"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <form onSubmit={handleSubmit}>
          <label className="upload-label">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />Subir PDF
          </label>

          {fileUrl && (
            <div className="pdf-viewer-container">
              <iframe
                src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title="PDF Preview" width="100%" height="300px" style={{ border: 'none' }}></iframe>
            </div>
          )}

          <button type="submit" className="submit-btn"> Enviar solicitud </button>
        </form>
      </div>
    </div>
  );
};

export default AplicacionEmpleo;
