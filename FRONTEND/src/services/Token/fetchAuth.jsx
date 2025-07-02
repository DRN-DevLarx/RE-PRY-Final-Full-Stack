import { getCookie } from "./sessionManager";
import { isAccessTokenExpired } from "./tokenUtils";
import { refreshAccessToken } from "./refreshToken";

export async function getTokenValido() {
  let token = getCookie("access_token");
  
  if (!token || isAccessTokenExpired(token)) {
    token = await refreshAccessToken();
  }

  return token;
}

export async function fetchAutenticado(url, options = {}) {
  const token = await getTokenValido();
  
  if (!token) throw new Error("No se pudo obtener un token válido");

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}