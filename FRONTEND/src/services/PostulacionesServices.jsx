import { fetchAutenticado } from "../services/Token/fetchAuth";

// GET: Obtener todas las postulaciones
async function GetPostulaciones() {
  try {
    const response = await fetchAutenticado("http://127.0.0.1:8000/api/postulaciones/");

    if (!response.ok) {
      throw new Error("Error al obtener postulaciones");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener postulaciones:", error);
    throw error;
  }
}

// POST: Crear nueva postulación
async function PostPostulacion(obj) {
  try {
    const response = await fetchAutenticado("http://127.0.0.1:8000/api/postulaciones/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al crear postulación: ${errorData.error || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear postulación:", error);
    throw error;
  }
}

// PUT: Actualizar una postulación
async function UpdatePostulacion(id, obj) {
  try {
    const response = await fetchAutenticado(`http://127.0.0.1:8000/api/postulaciones/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar postulación");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar postulación:", error);
    throw error;
  }
}

// DELETE: Eliminar una postulación
async function DeletePostulacion(id) {
  try {
    const response = await fetchAutenticado(`http://127.0.0.1:8000/api/postulaciones/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar postulación");
    }

    return { message: "Postulación eliminada correctamente" };
  } catch (error) {
    console.error("Error al eliminar postulación:", error);
    throw error;
  }
}

// Exportación unificada
export default {GetPostulaciones, PostPostulacion, UpdatePostulacion, DeletePostulacion};
