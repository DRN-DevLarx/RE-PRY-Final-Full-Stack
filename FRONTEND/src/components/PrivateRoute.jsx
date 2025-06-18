import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import GetCookie from '../services/GetCookie';

// Componente PrivateRoute para proteger rutas privadas
const PrivateRoute = ({ element }) => {
  const navigate = useNavigate(); // Usamos useNavigate para redirigir
  const [isRedirecting, setIsRedirecting] = useState(false); // Estado para manejar la redirección

  // const isAuthenticated = localStorage.getItem('usuarioActual'); // Verificamos si el usuario está autenticado
  
  const isAuthenticated = GetCookie.getCookie("access_token");

  useEffect(() => {
    // Si el usuario no está autenticado, mostramos el mensaje de alerta
    if (!isAuthenticated && !isRedirecting) {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Necesitas iniciar sesión para acceder a esta página.',
        background: "#1a1a1a",
        color: "#ffffff",
        showConfirmButton: false,
        timer: 2500,

      }).then(() => {
        setIsRedirecting(true); // Establecemos el estado de redirección después de que el usuario cierre la alerta
      });
    }
  }, [isAuthenticated, isRedirecting]); // Dependemos de isAuthenticated y isRedirecting

  // Redirigimos al login cuando se cambia el estado isRedirecting
  useEffect(() => {
    if (isRedirecting) {
      navigate('/login');
    }
  }, [isRedirecting, navigate]);

  // Si el usuario está autenticado, renderizamos el componente
  return isAuthenticated ? element : null;
};

export default PrivateRoute;
