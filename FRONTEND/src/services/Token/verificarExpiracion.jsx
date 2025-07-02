import { jwtDecode } from "jwt-decode";
import { getCookie, clearSessionCookies } from "./sessionManager";

import Swal from "sweetalert2";

export function verificarExpiracionAccess() {

  const access = getCookie("access_token");

  if (!access) return;

  try {
    const { exp } = jwtDecode(access);

    const now = Math.floor(Date.now() / 1000);

    // console.log("access token expira en:", exp - now, "segundos");

    if (exp < now) {
      clearSessionCookies();

      Swal.fire({
        icon: "info",
        title: "Sesión expirada",
        text: "Por seguridad, por favor vuelve a iniciar sesión.",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#2ae2b6",
      }).then(() => {
        window.location.href = "/login";
      });
    }
  } catch (error) {
    console.error("Error al decodificar el access token:", error);
  }
}
