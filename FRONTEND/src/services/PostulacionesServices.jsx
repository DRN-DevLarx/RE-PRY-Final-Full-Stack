
async function GetPostulacion() { 
    try {
        const response = await fetch("http://127.0.0.1:8000/api/postulaciones/");

        if (!response.ok) {
            throw new Error('Error al obtener Postulacion');
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error al obtener Postulacion:', error);
        throw error;
    }
}

async function PostPostulaciones(obj) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/postulaciones/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(obj),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al crear Postulacion: ${errorData.error || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al crear Postulacion:", error);
        throw error;
    }
}


async function PutPostulaciones(id, obj) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/postulaciones/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar Postulacion');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar Postulacion:', error);
        throw error;
    }
}

async function DeletePostulaciones(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/postulaciones/${id}/`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar Postulacion');
        }

        return { message: "Postulacion eliminada correctamente" };
    } catch (error) {
        console.error('Error al eliminar Postulacion:', error);
        throw error;
    }
}

export default { GetPostulacion, PostPostulaciones, PutPostulaciones, DeletePostulaciones };

