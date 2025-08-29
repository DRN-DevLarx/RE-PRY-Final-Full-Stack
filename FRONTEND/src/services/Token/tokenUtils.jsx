import { jwtDecode } from "jwt-decode";
import { getCookie, CerrarSesion } from "./sessionManager";
import Swal from "sweetalert2";

export function isAccessTokenExpired(token, margin = 30) {
  try {
    const { exp } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return exp - now < margin;
  } catch {
    return true;
  }
}

export function VerificarExpiracion() {

  const access = getCookie("access_token");
  
  if (!access) {
    console.log("No hay token o el token ha cambiado");   

    CerrarSesion();
    Swal.fire({
      icon: "info",
      title: "Sesión expirada",
      text: "Por seguridad, por favor vuelve a iniciar sesión.",
      background: "#1a1a1a",
      color: "#ffffff",
      confirmButtonColor: "#2ae2b6",
    }); 
  }

  try {
    const { exp } = jwtDecode(access);
    const now = Math.floor(Date.now() / 1000);

    console.log("access token expira en:", exp - now, "segundos");

    if (exp < now) {
      // CerrarSesion();

      Swal.fire({
        icon: "info",
        title: "Sesión expirada",
        text: "Por seguridad, por favor vuelve a iniciar sesión.",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#2ae2b6",
      });
    }
  } catch (error) {
    console.error("Error al decodificar el access token:", error);
  }
}