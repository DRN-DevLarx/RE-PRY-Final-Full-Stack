import React from 'react';
import '../styles/public.css'; // Asegúrate de tener este archivo CSS

function Publicar() {
  return (
    <div className="publicarContainer">
      <div className="cuadro">

        <h3>Selecciona una imagen</h3>
        <input type="file" />

        <h3>Nombre del puesto vacante</h3>
        <input type="text" placeholder="Ej: Programador Full Stack" />

        <h3>Cantidad de vacantes</h3>
        <input type="number" placeholder="Ej: 1" />

        <h3>Ubicación</h3>
        <input type="text" placeholder="Ej: Chacarita" />
      </div>


      <div className="cuadro">

        <h3>Categoría</h3>
        <input type="text" placeholder="Ej: Tecnología" />

        <h3>Salario</h3>
        <input type="text" placeholder="Ej: $150000" />

        <h3>Descripción general y requisitos</h3>
        <textarea placeholder="Describe el puesto..." rows="5"></textarea>

        <div style={{ marginTop: '20px' }}>
          <button>Publicar</button>
        </div>
      </div>
    </div>
  );
}

export default Publicar;

