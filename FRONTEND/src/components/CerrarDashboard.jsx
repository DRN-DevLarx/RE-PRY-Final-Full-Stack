import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function CerrarDashboard(navigate) {
    Swal.fire({
        background: "#1a1a1a",
        icon: "question",
        iconColor: "#2ae2b6",
        title: "¿Deseas cerrar el centro de control?",
        color: "white",
        confirmButtonText: "Sí, salir",
        confirmButtonColor: "#2ae2b6",
        cancelButtonText: "No",
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            navigate("/PrincipalPage");
        }
    });
}