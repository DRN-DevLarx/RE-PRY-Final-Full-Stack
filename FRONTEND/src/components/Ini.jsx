import React from 'react'
import "../styles/ini.css"


function Ini() {
  console.log("Rendirizateee");
  
  return (
    <div className='bodyinicio'>

       <header>
        

        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'  > 
          
        <div className='container-fluid'>

            <img className='logo' src="../public/Iconlogo.png" alt="" />       
            <h2 id='tituloNav'> <b>EmpleaTico</b></h2> 
        
          
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

          

            <div className='collapse navbar-collapse' id='menuPrincipal'>
              <ul className='navbar-nav ms-auto' >
              
              <button id='btnregi'><b>Registrarse</b></button>  
              <button id='btninic'><b>Iniciar Sesion</b></button>
              </ul>
            </div>

        </div>  
          
        </nav>
     
       </header>

     
     <main>


      

    
    <div className='contenedorInicial'>

  

      <div className='derecha'>      
        <div className='rectangulos'>
          
          <div className='capa1'>
            <p>Necesitas soporte?, escríbenos </p>
          </div>

          <div className='capa2'>  
            <a  >Inicio</a>
            <a >Sobre nosotros</a>
            <a >Contacto y soporte</a>

          </div>

        </div>
          

      </div>

      <div className='contenedor_texto_central'>
          
          <div className='texto_central'>
              <span className='text-light'><b> Oportunidades           laborales al
              alcance de tu mano, descubrelas aquí.
                </b></span>
          </div>
       
       <button id='btnoferta'>Ver Ofertas</button>

      </div>

    </div>

      

     </main>
      
    </div>
  )
}

export default Ini