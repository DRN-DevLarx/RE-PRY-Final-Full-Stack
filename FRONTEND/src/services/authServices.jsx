
import { useNavigate } from "react-router-dom";

// 🔹 Función para obtener una cookie específica
function getCookie(name) {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
    }, {});
    return cookies[name];
}

// 🔹 Autenticación: Obtiene `access_token` y `refresh_token` tras login
async function login(obj) {
    const navigate = useNavigate()
    
    try {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });

        const data = await response.json();

        if (response.ok) {
            document.cookie = `access_token=${data.access}; path=/; secure; SameSite=Strict`;        
            navigate("/admin");
        } else {
            console.error("Error en la autenticación:", data);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }

}

// 🔹 Refrescar el `access_token` cuando expira
async function refreshToken() {
    const refreshToken = getCookie("refresh_token");
    if (!refreshToken) return null; 

    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken })
    });

    const data = await response.json();
    if (data.access) {
        document.cookie = `access_token=${data.access}; path=/; secure; SameSite=Strict`;
        return data.access;
    }
    return null;
}

// 🔹 Obtener datos del usuario autenticado
async function getUserProfile() {
    let accessToken = getCookie("access_token");
    if (!accessToken) {
        accessToken = await refreshToken(); // Si expiró, intenta renovarlo
    }

    const response = await fetch("http://127.0.0.1:8000/api/user-data/", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        console.error("Error al obtener datos del usuario.");
        return null;
    }

    return await response.json();
}

// 🔹 Cerrar sesión: Elimina cookies y redirige al login
function logout() {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login"; // Redirigir tras logout
}

// 🔹 Exportar todas las funciones por defecto
export default {
    getCookie,
    login,
    refreshToken,
    getUserProfile,
    logout
};
