import { getCookie } from "./sessionManager";
import { isAccessTokenExpired } from "./tokenUtils";
import { refreshAccessToken } from "./refreshToken";
import {CerrarSesion} from './sessionManager'

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

export async function VerificarToken () {
  const accessToken = getCookie("access_token");

  const response = await fetch(`http://127.0.0.1:8000/api/user-data/`, {
    method: "GET",
    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
      }
    });
    
  if (!response.ok) {
    console.log("Token inválido o expirado");
    return false
    
  } else {
    const userData = await response.json();
    return userData;
  }
}