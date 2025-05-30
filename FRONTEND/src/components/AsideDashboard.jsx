import React from 'react'
import { useState } from "react";
import "../styles/AsideDashboard.css";

function AsideDashboard() {

    const [activo, setActivo] = useState(null);
    const opciones = [
        { nombre: "Perfil", esPerfil: true },
        { nombre: "Publicaciones del último mes" },
        { nombre: "Usuarios Registrados" },
        { nombre: "Alertas de infracción" },
        { nombre: "Publicaciones desactivadas" }
    ];
  return (
    
    <aside id='asideDashboard'>
        <h3>Administración</h3>
        <hr />

        <div>
            {opciones.map((opcion, index) => (
                <div key={index} className={`contenedor ${activo === index ? "activo" : ""}`} onClick={() => setActivo(index)}> 
                    {opcion.esPerfil ? (
                        <div className="perfilDashboard">
                            <img src="/public/Iconlogo.png" alt="Perfil" />
                            <p>Nombre Admin</p>
                        </div>
                    ) : (
                        opcion.nombre
                    )}
                </div>
            ))}
        </div>
    </aside>
  )
}

export default AsideDashboard
