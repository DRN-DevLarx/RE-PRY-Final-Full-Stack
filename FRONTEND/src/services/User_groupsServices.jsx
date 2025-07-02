
import { fetchAutenticado } from "../services/Token/fetchAuth";

async function GetUser_group() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/user-group/");

        if (!response.ok) {
            throw new Error('Error al obtener User_group');
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error al obtener User_group:', error);
        throw error;
    }
}

async function PostUser_group(obj) {
    
    try {
        const response = await fetch("http://127.0.0.1:8000/api/user-group/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al crear User_group');
        }

        return await response.json();

    } catch (error) {
        console.error('Error al crear User_group:', error);
        throw error;
    }
}

async function PutUser_group(id, obj) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/user-group/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar User_group');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar User_group:', error);
        throw error;
    }
}

async function DeleteUser_group(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/user-group/${id}/`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar User_group');
        }

        return { message: "User_group eliminado correctamente" };
    } catch (error) {
        console.error('Error al eliminar User_group:', error);
        throw error;
    }
}

export default {GetUser_group, PostUser_group, PutUser_group, DeleteUser_group};

