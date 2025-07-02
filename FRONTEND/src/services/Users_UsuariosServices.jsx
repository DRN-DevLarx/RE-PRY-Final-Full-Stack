
import { fetchAutenticado } from "../services/Token/fetchAuth";

async function GetUserUsuario() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/users-usuarios/");

        if (!response.ok) {
            throw new Error('Error al obtener UserUsuario');
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error al obtener UserUsuario:', error);
        throw error;
    }
}

async function PostUserUsuario(obj) {
        
    try {
        const response = await fetch("http://127.0.0.1:8000/api/users-usuarios/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al crear UserUsuario');
        }

        return await response.json();

    } catch (error) {
        console.error('Error al crear UserUsuario:', error);
        throw error;
    }
}

async function PutUserUsuario(id, obj) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users-usuarios/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar UserUsuario');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar UserUsuario:', error);
        throw error;
    }
}

async function DeleteUserUsuario(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users-usuarios/${id}/`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar UserUsuario');
        }

        return { message: "UserUsuario eliminado correctamente" };
    } catch (error) {
        console.error('Error al eliminar UserUsuario:', error);
        throw error;
    }
}

export default {GetUserUsuario, PostUserUsuario, PutUserUsuario, DeleteUserUsuario};

