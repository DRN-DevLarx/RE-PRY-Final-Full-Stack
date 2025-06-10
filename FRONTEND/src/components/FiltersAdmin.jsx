import React from 'react'

function FiltersAdmin() {
  return (
    <div className='filtros'>
        
        <select name="" id="">
             <option value="">Area de trabajo</option>
        </select>

        <select name="" id="">
            <option value="">Ubicacion</option>
        </select>

        <select name="" id="">
            <option value="">Salario</option>
        </select>

        <select name="" id="">
            <option value="">Estado</option>
            <option value="todas">Todas</option>
            <option value="activas">Activas</option>
            <option value="desactivas">Desactivas</option>
        </select>

        <input type="text" placeholder='Palabra clave' /> 

        <button id='btnBuscar'> Buscar </button>

    </div>
  )
}

export default FiltersAdmin
