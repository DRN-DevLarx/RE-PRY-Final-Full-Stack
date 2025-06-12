
async function GetUsuario() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/usuarios/");

        if (!response.ok) {
            throw new Error('Error al obtener Usuario');
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error al obtener Usuario:', error);
        throw error;
    }
}

async function GetUsuariosByIds(ids) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/usuarios/");
        
        if (!response.ok) {
            throw new Error("Error al obtener los Usuarios");
        }

        const allUsuarios = await response.json();
        return allUsuarios.filter(usuario => ids.includes(usuario.id)); // Filtra solo los IDs necesarios

    } catch (error) {
        console.error("Error al obtener los Usuarios por ID:", error);
        throw error;
    }
}

async function PostUsuario(obj) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(obj),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al crear usuario: ${errorData.error || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
}


async function PutUsuario(id, obj) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar usuario');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
}

async function DeleteUsuario(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}/`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar usuario');
        }

        return { message: "usuario eliminado correctamente" };
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
}

export default { GetUsuario, GetUsuariosByIds, PostUsuario, PutUsuario, DeleteUsuario };

