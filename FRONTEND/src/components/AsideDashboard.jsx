
import { useState, useEffect } from "react";
import PerfilAdmin from '../components/PerfilAdmin'
import Publicaciones from '../components/Publicaciones'
import UserRegi from '../components/UserRegi'
import Alerts from '../components/Alerts'
import RegisterAdmin from "./RegisterAdmin";
import GetCookie from "../services/GetCookie";

import MisPublicaciones from "./MisPublicaciones";
import ChatsNotifics from "./ChatsNotifics";

import Users_UsuariosServices from '../services/Users_UsuariosServices';
import usersServices from '../services/usersServices';
import usuariosServices from '../services/usuariosServices';


import "../styles/AsideDashboard.css";

const Menu = () => {

    useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
            try {
                const datosIntermedios = await Users_UsuariosServices.GetUserUsuario();
                
                if (datosIntermedios.length > 0) {
                    const userIds = datosIntermedios.map(item => item.user);
                    const usuarioIds = datosIntermedios.map(item => item.usuario);
                    
                    const datosUsers = await usersServices.GetUsersByIds(userIds);
                    const datosUsuarios = await usuariosServices.GetUsuariosByIds(usuarioIds);
                    
                    
                    if (isMounted) {
                        setUsers(datosUsers);
                        setUsuarios(datosUsuarios);
                        setDatosIntermedios(datosIntermedios);
                    }
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
        
        return () => {
            isMounted = false;
        };
    }, []);

    const [DatosIntermedios, setDatosIntermedios] = useState([])
    const [Users, setUsers] = useState([])
    // const [Usuarios, setUsuarios] = useState([])
    
    const RolUser = GetCookie.getCookie("role");

    const IDUser = GetCookie.getCookie("user_id")
    const IDusuario = DatosIntermedios.find(item => item.user == IDUser)?.usuario;


    let Opciones = []
        if (RolUser == "admin") {
            Opciones = [
                { nombre: "Perfil", esPerfil: true, componente: <PerfilAdmin /> },
                { nombre: "Publicaciones", esPerfil: false, componente: <Publicaciones /> },
                { nombre: "Usuarios registrados", esPerfil: false, componente: <UserRegi /> },
                { nombre: "Alertas", esPerfil: false, componente: <Alerts /> },
                { nombre: "Registrar admin", esPerfil: false, componente: <RegisterAdmin /> }
            ];
        } else if (RolUser == "empresa") {
            Opciones = [
                { nombre: "Perfil", esPerfil: true, componente: <PerfilAdmin /> },
                { nombre: "Publicaciones", esPerfil: false, componente: <MisPublicaciones /> },
                { nombre: "Mensajes", esPerfil: false, componente: <ChatsNotifics /> }
            ]
        }
    
    let IMgUser = "https://res.cloudinary.com/dw65xvmgp/image/upload/v1749743238/FB_chiuol.avif"
    
    const [activo, setActivo] = useState(0); // Estado para la opción seleccionada

    const [Usuarios, setUsuarios] = useState([])

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
                
        if(user.id == IDusuario && user.referenciaIMG_oferente != "" && user.referenciaIMG_oferente != "null" && user.referenciaIMG_oferente != null) {
            IMgUser = user.referenciaIMG_oferente
        }
    })


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
