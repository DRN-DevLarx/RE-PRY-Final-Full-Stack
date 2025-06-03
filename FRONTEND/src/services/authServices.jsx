// src/services/authService.js

// 🔹 Función para obtener una cookie específica
export function getCookie(name) {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
    }, {});
    return cookies[name];
}

// 🔹 Autenticación: Obtiene `access_token` y `refresh_token` tras login
export async function login(obj) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj) // Enviar credenciales
        });

        const data = await response.json();
        
        if (response.ok) {
            document.cookie = `access_token=${data.access}; path=/; secure; SameSite=Strict`;
            document.cookie = `refresh_token=${data.refresh}; path=/; secure; SameSite=Strict`;
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error en login:", error);
        return false;
    }
}

// 🔹 Refrescar el `access_token` cuando expira
export async function refreshToken() {
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
export async function getUserProfile() {
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
export default function logout() {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login"; // Redirigir tras logout
}
