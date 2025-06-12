


async function GetOfertas() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/ofertas/");

        if (!response.ok) {
            throw new Error('Error al obtener oferta');
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error al obtener oferta:', error);
        throw error;
    }
}

async function PostOfertas(obj) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/ofertas/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });

        // Guardamos el status antes de convertir a JSON
        const status = response.status;

        if (!response.ok) {
            throw new Error(`Error al crear oferta. Código: ${status}`);
        }

        const data = await response.json();
        return { status, data }; // Retornamos ambos valores
    } catch (error) {
        console.error("Error al crear oferta:", error);
        return { status: null, data: null }; // Evitamos errores si falla el request
    }
}

async function PutOfertas(id, obj) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/ofertas/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar oferta');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar oferta:', error);
        throw error;
    }
}

async function DeleteOfertas(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/ofertas/${id}/`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar oferta');
        }

        return { message: "oferta eliminado correctamente" };
    } catch (error) {
        console.error('Error al eliminar oferta:', error);
        throw error;
    }
}

export default {GetOfertas, PostOfertas, PutOfertas, DeleteOfertas};

