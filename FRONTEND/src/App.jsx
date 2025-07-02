
import Routing from "./routes/routing"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { verificarExpiracionAccess } from "./services/Token/verificarExpiracion";

function App() {

useEffect(() => {
  const interval = setInterval(() => {
    verificarExpiracionAccess();
    // console.log("Revisa");
  }, 300 * 100); // Cada 5 minutos

  return () => clearInterval(interval);
}, []);


  return (
    <>
      <div>
        <Routing />
      </div>
    
    </>
  )
}

export default App
