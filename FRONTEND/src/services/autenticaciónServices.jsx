async function loginUser(credenciales) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credenciales: "include",
            body: JSON.stringify(credenciales),
        });

        if (!response.ok) {
            throw new Error("Error en la autenticación");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
}

async function getUserData() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/user/", {
            method: "GET",
            credenciales: "include",
        });

        if (!response.ok) {
            throw new Error("Error al obtener datos del usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        throw error;
    }
}

async function logoutUser() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/logout/", {
            method: "POST",
            credenciales: "include", // Para eliminar la cookie del JWT en el servidor
        });

        if (!response.ok) {
            throw new Error("Error al cerrar sesión");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        throw error;
    }
}

export default { loginUser, getUserData, logoutUser };
