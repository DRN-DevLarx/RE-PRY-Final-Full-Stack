import React from 'react'

function Footer() {
  return (
    <div>
      <footer  id='footer'>
        <div className='FooterLeft'>
          <h1 className='t1'>Contacto del Creador</h1>
          <hr className='hh' />

            <div className='infoLeft'>
              <p><b>Nombre:</b>  Darien Aguilar</p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg>
                <a href="mailto:darienaguilar3000@gmail.com"> darienaguilar3000@gmail.com </a></p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                </svg>
                
                  100 metros Norte de la escuela Morales, casa color fucsia a mano izquierda.</p>           
              </div>
          

        </div>

        <div  className='FooterRight'>
          <h1 className='t2'>Sobre Esta Web</h1>
          <hr className='hh'/>

          <div className='infoRight'>
            <p>"Somos una plataforma dedicada a conectar talento local con oportunidades laborales en la zona norte de Puntarenas. Creemos en el poder de la tecnología para impulsar el crecimiento económico y fortalecer nuestra comunidad, ofreciendo un espacio accesible donde empleadores y buscadores de empleo puedan encontrarse fácilmente. Nos comprometemos a brindar información actualizada y herramientas para facilitar el desarrollo profesional de quienes buscan avanzar en su carrera. Juntos, trabajamos por un futuro más próspero y lleno de posibilidades."</p>
          </div>

        </div>

        <div className="footer_footer">
            <p>© 2023 EmpleaTico. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
