import React, { useState } from 'react'

import PostLibros from '../services/librosServices'

function LibrosCrud() {

  const [TituloLibro,SetTituloLibro] = useState()
  const [AutorLibro,SetAutorLibro] = useState()
  const [FechaPublicacion,SetFechaPublicacion] = useState()



  

  function titulo(evento) {

    SetTituloLibro(evento.target.value)
    
  }

  function autor(evento) {
     SetAutorLibro(evento.target.value)
    
  }

  function fecha(evento) {
     SetFechaPublicacion(evento.target.value)
    
  }

  async function cargarLibro() {

   // console.log(TituloLibro,AutorLibro,FechaPublicacion);

    const obj ={
      titulo:TituloLibro,
      fecha_publicacion:FechaPublicacion,
      autor:AutorLibro

    }

 
    
    const respuestaServer = await PostLibros(obj)

    console.log(respuestaServer);
    
  }






  return (
    <div>

      <label htmlFor="">Titulo</label>
      <input  value={TituloLibro} onChange={titulo} type="text" />
      <br />
      <br />
      <label htmlFor="">Autor </label>
      <input value={AutorLibro} onChange={autor} type="text" />
      <br />
      <br />
      <label htmlFor="">Fecha Publicacion</label>
      <input value={FechaPublicacion} onChange={fecha} type="text" />
      <br />
      <br />
      <button onClick={cargarLibro}>Crear Libro</button>


    </div>



  )
}



export default LibrosCrud