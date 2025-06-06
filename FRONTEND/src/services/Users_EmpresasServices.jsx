


async function GetUserEmpresa() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/users-empresas/");

        if (!response.ok) {
            throw new Error('Error al obtener UserEmpresa');
        }

        return await response.json();
        
    } catch (error) {
        console.error('Error al obtener UserEmpresa:', error);
        throw error;
    }
}

async function PostUserEmpresa(obj) {
        
    try {
        const response = await fetch("http://127.0.0.1:8000/api/users-empresas/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al crear UserEmpresa');
        }

        return await response.json();

    } catch (error) {
        console.error('Error al crear UserEmpresa:', error);
        throw error;
    }
}

async function PutUserEmpresa(id, obj) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users-empresas/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar UserEmpresa');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar UserEmpresa:', error);
        throw error;
    }
}

async function DeleteUserEmpresa(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users-empresas/${id}/`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar UserEmpresa');
        }

        return { message: "UserEmpresa eliminado correctamente" };
    } catch (error) {
        console.error('Error al eliminar UserEmpresa:', error);
        throw error;
    }
}

export default {GetUserEmpresa, PostUserEmpresa, PutUserEmpresa, DeleteUserEmpresa};

