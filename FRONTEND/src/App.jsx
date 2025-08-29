
import Routing from "./routes/routing"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

// useEffect(() => {
//   const interval = setInterval(() => {
//     VerificarExpiracion();
//     // console.log("Revisa");
//   }, 100 * 100); // Cada 3 minutos

//   return () => clearInterval(interval);
// }, []);


  return (
    <>
      <div>
        <Routing />
      </div>
    
    </>
  )
}

export default App
