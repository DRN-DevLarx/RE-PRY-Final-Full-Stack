
import Swal from "sweetalert2";

export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

export function CerrarSesion() {
  document.cookie.split(";").forEach(cookie => document.cookie = cookie.split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
  window.location = "/login";
  console.log("Sesión cerrada");
}

export function CerrarSesionPorSeguridad() {
  document.cookie.split(";").forEach(cookie => document.cookie = cookie.split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
  window.location = "/login";
  console.log("Sesión cerrada");

  setTimeout(() => {
    Swal.fire({
      icon: "info",
      title: "Sesión expirada",
      text: "Por seguridad, por favor vuelve a iniciar sesión.",
      background: "#1a1a1a",
      color: "#ffffff",
      confirmButtonColor: "#2ae2b6",
    });
  }), 2000

  
}