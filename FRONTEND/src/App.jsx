
import Routing from "./routes/routing"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import VerificarExpiracion from "./services/Token/VerificarExpiracion";

function App() {

useEffect(() => {
  const interval = setInterval(() => {
    VerificarExpiracion();
    // console.log("Revisa");
  }, 300 * 100); // Cada 3 minutos

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
