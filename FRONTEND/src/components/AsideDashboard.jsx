import React from 'react'
import { useState, useEffect } from "react";
import "../styles/AsideDashboard.css";
import usuariosServices from '../services/usuariosServices';
import GetCookie from '../services/GetCookie';
function AsideDashboard() {

    const [activo, setActivo] = useState(null);
    const opciones = [
        { nombre: "Perfil", esPerfil: true },
        { nombre: "Publicaciones" },
        { nombre: "Usuarios Registrados" },
        { nombre: "Alertas de infracción" },
        { nombre: "Publicaciones desactivadas" }
    ];

    const [Usuarios, setUsuarios] = useState([])

    let IMgUser = "https://res.cloudinary.com/dw65xvmgp/image/upload/v1749743238/FB_chiuol.avif"


    useEffect(() => {
        let isMounted = true;

        const fetch = async () => {
            const DatosUsuarios = await usuariosServices.GetUsuario();

            if (isMounted) {
                setUsuarios(DatosUsuarios);
            }
            };

        fetch();

        return () => {
            isMounted = false;
        };
      
    }, []);


    Usuarios.find((user) => {
        if(user.referenciaIMG_oferente != "") {
            IMgUser = user.referenciaIMG_oferente
        }
    })

  return (
    
    <aside id='asideDashboard'>
        <h3>Administración</h3>
        <hr />

        <div>
            {opciones.map((opcion, index) => (
                <div key={index} className={`contenedor ${activo === index ? "activo" : ""}`} onClick={() => setActivo(index)}> 
                    {opcion.esPerfil ? (
                        <div className="perfilDashboard">
                            <img src={IMgUser} alt="Perfil" />
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
