import { useState, useEffect } from "react";
import PerfilAdmin from '../components/PerfilAdmin'
import Publicaciones from '../components/Publicaciones'
import UserRegi from '../components/UserRegi'
import RegisterAdmin from "./RegisterAdmin";

import ChatsNotifics from "./ChatsNotifics";

import GetCookie from "../services/GetCookie";


import usersServices from '../services/usersServices';

import usuariosServices from '../services/usuariosServices';
import Users_UsuariosServices from '../services/Users_UsuariosServices';
import empresasServices from "../services/empresasServices";
import Users_EmpresasServices from "../services/Users_EmpresasServices";

import "../styles/AsideDashboard.css";

const Menu = () => {

    let IMgUser = "https://res.cloudinary.com/dw65xvmgp/image/upload/v1749743238/FB_chiuol.avif"

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const datosIntermedios = await Users_UsuariosServices.GetUserUsuario();
                const datosIntermediosEmpresas = await Users_EmpresasServices.GetUserEmpresa();
                
                if (datosIntermedios.length > 0) {
                    const userIds = datosIntermedios.map(item => item.user);
                    const usuarioIds = datosIntermedios.map(item => item.usuario);
                    const empresaIds = datosIntermediosEmpresas.map(item => item.empresa);
                    
                    // const DatosUsers = await usuariosServices.GetUsuario();

                    const datosUsersIds = await usersServices.GetUsersByIds(userIds);
                    const datosUsuarios = await usuariosServices.GetUsuariosByIds(usuarioIds);
                    const datosEmpresas = await empresasServices.GetEmpresaByIds(empresaIds);
                    
                    
                    if (datosUsersIds && datosUsuarios && datosEmpresas) {
                        setUsers(datosUsersIds);
                        setUsuarios(datosUsuarios);
                        setEmpresas(datosEmpresas)
                        setDatosIntermedios(datosIntermedios);
                        setDatosIntermediosEmpresas(datosIntermediosEmpresas);
                    }
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
        
    }, []);

    const [DatosIntermedios, setDatosIntermedios] = useState([])
    const [DatosIntermediosEmpresas, setDatosIntermediosEmpresas] = useState([])

    const [Users, setUsers] = useState([])
    const [Usuarios, setUsuarios] = useState([])
    const [Empresas, setEmpresas] = useState([])
    
    const RolUser = GetCookie.getCookie("role");
    const IDUser = GetCookie.getCookie("user_id")
    const IDusuario = DatosIntermedios.find(item => item.user == IDUser)?.usuario;
    const IDempresa = DatosIntermediosEmpresas.find(item => item.user == IDUser)?.empresa;

    let Opciones = []

    if (RolUser == "admin") {
        Opciones = [
            { nombre: "Perfil", esPerfil: true, componente: <PerfilAdmin /> },
            { nombre: "Publicaciones", esPerfil: false, componente: <Publicaciones /> },
            { nombre: "Usuarios registrados", esPerfil: false, componente: <UserRegi /> },
            { nombre: "Registrar admin", esPerfil: false, componente: <RegisterAdmin /> }
        ];

        Usuarios.find((user) => {
                    
            if(user.id == IDusuario && user.referenciaIMG_oferente != "" && user.referenciaIMG_oferente != "null" && user.referenciaIMG_oferente != null) {
                IMgUser = user.referenciaIMG_oferente
            }
        })

    } else if (RolUser == "empresa") {
        Opciones = [
            { nombre: "Perfil", esPerfil: true, componente: <PerfilAdmin /> },
            { nombre: "Publicaciones", esPerfil: false, componente: <Publicaciones /> },
            { nombre: "Mensajes", esPerfil: false, componente: <ChatsNotifics /> }
        ]

        Empresas.find((empresaFind) => {
            
            if(empresaFind.id == IDempresa && empresaFind.referenciaIMG_empresa != "" && empresaFind.referenciaIMG_empresa != "null" && empresaFind.referenciaIMG_empresa != null) {
                IMgUser = empresaFind.referenciaIMG_empresa
            }
        })
    }
    
    
    const [activo, setActivo] = useState(0);

    return (
        <div className='ContDashboard'>
            <div className="asideDashboard">
                <h3>Adminstración</h3>
                {Opciones.map((opcion, index) => (
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

            <div className="contenido">
                {Opciones[activo].componente} {/* Renderiza el componente correspondiente */}
            </div>
            
        </div>
    );
};

export default Menu;
