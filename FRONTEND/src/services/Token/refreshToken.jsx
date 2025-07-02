import { getCookie } from "./sessionManager";

export async function refreshAccessToken() {  
  const refresh = getCookie("refresh_token");

  if (!refresh) return null;

  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) throw new Error("Refresh token inválido");

    const data = await response.json();
    document.cookie = `access_token=${data.access}; path=/; secure; SameSite=Strict`;
    console.log(data);
    
    
    return data.access;
  } catch (error) {
    console.error("Error al renovar el token", error);
    return null;
  }
}