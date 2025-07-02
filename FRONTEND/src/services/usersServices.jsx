
import { fetchAutenticado } from "../services/Token/fetchAuth";

async function GetUser() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/users/");

        if (!response.ok) {
            throw new Error('Error al obtener Usuario');
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error al obtener Usuario:', error);
        throw error;
    }
}

async function GetUsersByIds(ids) {
    try {
        const response = await fetchAutenticado("http://127.0.0.1:8000/api/users/");
        
        if (!response.ok) {
            throw new Error("Error al obtener los Users");
        }

        const allUsers = await response.json();
        return allUsers.filter(user => ids.includes(user.id)); // Filtra solo los IDs necesarios

    } catch (error) {
        console.error("Error al obtener los Users por ID:", error);
        throw error;
    }
}

async function PostUser(obj) {
    
    try {
        const response = await fetch("http://127.0.0.1:8000/api/users/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al crear usuario');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

async function PutUser(id, obj) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
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

async function PutUserPatch(id, obj) {
    
    try {        
        const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
            method: 'PATCH',
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

async function DeleteUser(id) {
    try {
        const response = await fetchAutenticado(`http://127.0.0.1:8000/api/users/${id}/`, {
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
    
// export async function GetUserData(id) {
//   const res = await ObtenerAuth(`http://127.0.0.1:8000/api/users/${id}/`);
//   const data = await res.json();
//   return data;
// }


export default { GetUser, GetUsersByIds, PostUser, PutUser, PutUserPatch, DeleteUser };

