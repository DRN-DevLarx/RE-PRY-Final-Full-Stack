async function PostMensajesCYS(obj) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/mensajesCYS/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    });

    const data = await response.json();

    return {status: response.status,data,};

  } catch (error) {
    console.error('Error al crear mensaje:', error);
    throw error;
  }
}

async function ClaveTemporal(obj) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/claveTemporal/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    });

    const data = await response.json();

    return {status: response.status, data,};

  } catch (error) {
    console.error('Error al enviar solicitud:', error);
    throw error;
  }
}

export default {PostMensajesCYS, ClaveTemporal};