import React, { useState } from 'react';
import '../styles/AplicasionEmpleo.css';

const AplicacionEmpleo = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [comment, setComment] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      alert('Por favor, selecciona solo archivos PDF.');
      setFileUrl(null);
    }
  };

  const handleClose = () => {
    alert('Cerrar formulario');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Solicitud enviada.');
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
            Subir PDF
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </label>

          {fileUrl && (
            <div className="pdf-viewer-container">
              <iframe
                src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                title="PDF Preview"
                type="application/pdf"
                width="100%"
                height="300px"
                style={{ border: 'none' }}
              ></iframe>
            </div>
          )}

          <button type="submit" className="submit-btn">
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
};

export default AplicacionEmpleo;
