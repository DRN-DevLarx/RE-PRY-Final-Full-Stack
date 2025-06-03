


async function GetIntereses() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/intereses-usuarios/");

        if (!response.ok) {
            throw new Error('Error al obtener intereses');
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error al obtener intereses:', error);
        throw error;
    }
}

async function PostIntereses(obj) {
    
    try {
        const response = await fetch("http://127.0.0.1:8000/api/intereses-usuarios/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al crear intereses');
        }

        return await response.json();

    } catch (error) {
        console.error('Error al crear intereses:', error);
        throw error;
    }
}

async function PutIntereses(id, obj) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/intereses-usuarios/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar intereses');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar intereses:', error);
        throw error;
    }
}

async function DeleteIntereses(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/intereses-usuarios/${id}/`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar intereses');
        }

        return { message: "intereses eliminado correctamente" };
    } catch (error) {
        console.error('Error al eliminar intereses:', error);
        throw error;
    }
}

export default {GetIntereses, PostIntereses, PutIntereses, DeleteIntereses};

