
async function GetInteUser() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/intereses-usuarios/");

        if (!response.ok) {
            throw new Error('Error al obtener User');
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error al obtener User:', error);
        throw error;
    }
}

async function PostInteUser(obj) {
    
    try {
        const response = await fetch("http://127.0.0.1:8000/api/intereses-usuarios/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al crear User');
        }

        return await response.json();

    } catch (error) {
        console.error('Error al crear User:', error);
        throw error;
    }
}

async function PutInteUser(id, obj) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/intereses-usuarios/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar User');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar User:', error);
        throw error;
    }
}

async function DeleteInteUser(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/intereses-usuarios/${id}/`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar User');
        }

        return { message: "User eliminado correctamente" };
    } catch (error) {
        console.error('Error al eliminar User:', error);
        throw error;
    }
}

export default {GetInteUser, PostInteUser, PutInteUser, DeleteInteUser};

