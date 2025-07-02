import { fetchAutenticado } from "../services/Token/fetchAuth";

// Obtener TODAS las ofertas
async function GetOfertas() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/ofertas/");

    if (!response.ok) {
      throw new Error("Error al obtener ofertas");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener ofertas:", error);
    throw error;
  }
}

// Obtener oferta por ID
async function GetOfertaById(id) {
  try {
    const response = await fetchAutenticado(`http://127.0.0.1:8000/api/ofertas/${id}/`);

    if (!response.ok) {
      throw new Error("Error al obtener oferta");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener oferta:", error);
    throw error;
  }
}

// Crear nueva oferta (POST)
async function PostOfertas(obj) {
  try {
    const response = await fetchAutenticado("http://127.0.0.1:8000/api/ofertas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    const status = response.status;

    if (!response.ok) {
      throw new Error(`Error al crear oferta. Código: ${status}`);
    }

    const data = await response.json();
    return { status, data };
  } catch (error) {
    console.error("Error al crear oferta:", error);
    return { status: null, data: null };
  }
}

// Actualizar oferta (PATCH)
async function UpdateOferta(id, obj) {
  try {
    const response = await fetchAutenticado(`http://127.0.0.1:8000/api/ofertas/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar oferta");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar oferta:", error);
    throw error;
  }
}

// Eliminar oferta (DELETE)
async function DeleteOferta(id) {
  try {
    const response = await fetchAutenticado(`http://127.0.0.1:8000/api/ofertas/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar oferta");
    }

    return { message: "Oferta eliminada correctamente" };
  } catch (error) {
    console.error("Error al eliminar oferta:", error);
    throw error;
  }
}

// Exportación unificada por default
export default { GetOfertas, GetOfertaById, PostOfertas, UpdateOferta, DeleteOferta };
