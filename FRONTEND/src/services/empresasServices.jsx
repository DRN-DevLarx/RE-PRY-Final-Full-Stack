
async function GetEmpresa() { 
    try {
        const response = await fetch("http://127.0.0.1:8000/api/empresas/");

        if (!response.ok) {
            throw new Error('Error al obtener Empresa');
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error al obtener Empresa:', error);
        throw error;
    }
}

async function PostEmpresa(obj) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/empresas/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(obj),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al crear Empresa: ${errorData.error || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al crear Empresa:", error);
        throw error;
    }
}


async function PutEmpresa(id, obj) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/empresas/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar Empresa');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar Empresa:', error);
        throw error;
    }
}

async function DeleteEmpresa(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/empresas/${id}/`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar Empresa');
        }

        return { message: "Empresa eliminado correctamente" };
    } catch (error) {
        console.error('Error al eliminar Empresa:', error);
        throw error;
    }
}

export default { GetEmpresa, PostEmpresa, PutEmpresa, DeleteEmpresa };

