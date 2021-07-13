import React, { Fragment } from 'react'
import { useState } from 'react'

import logo from 'assets/icons/git_logo.svg'
import contacto from 'assets/social/contact.svg'
import mapa from 'assets/social/maps.svg'
import face from 'assets/social/facebook.svg'
import insta from 'assets/social/insta.svg'
import youtube from 'assets/social/youtube.svg'

// import linkedin from 'assets/social/linkedin.svg'
import hora from 'assets/social/horarios.svg'


const TheFooter = () => {

  const [ isMap, setIsMap ] = useState(false)

  const toggole = () => setIsMap(!isMap)
  
  return (
    <Fragment>
        <div className="footer-main">
          <div className="footer-a">

          <div className="title--footer">
              <span>Grupo Intecsa</span>
              <img src={logo} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-logo" />
            </div>


            <div className="footer_section d-flex justify-content-center justify-content-md-start">
              <div className="links-redes-content">
              <div>
                <h5>Síguenos en:</h5>
              </div>
              <div className="col-12">
              <a href="https://www.facebook.com/Grupo-Intecsa-Mx-Oficial-213945636173987/"
                target="_blank"
                rel="noreferrer follow"
                aria-label="Sígenos en facebook"
                >
                  <img src={face} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-redes" />
              </a>

              <a href="https://www.instagram.com/grupointecsamx/?hl=es-la"
                target="_blank"
                rel="noreferrer follow"
                aria-label="Sígenos en instagram"
                >
                  <img src={insta} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-redes" />
              </a>

              <a href="https://www.youtube.com/channel/UCLglnunszAKCtMYLaNDBpUw"
                  target="_blank"
                  rel="noreferrer follow"
                  aria-label="Cómo llegar"
                  >
                <img src={youtube} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-redes" />
              </a>

                  {/* <img src={linkedin} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-redes" /> */}
                  
              </div>
              </div>

            </div>
            
          </div>
          
          <div className="footer-b">
            
          <div className="title--footer">
          <span>Información de Contacto</span>
          </div>
          <div className="footer_secction">
                <img src={contacto} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-imges" />
                  <div className="col-sm-12 col-md-6">
                  
                  <a href="mailto:contacto@grupointecsa.com">
                  <h5>contacto@grupointecsa.com</h5>
                  </a>
                    <div className="d-flex flex-column">
                      <p>¿Tienes dudas? ¡Llámanos y te apoyamos!</p>
                      <a href="tel:525555701197">
                      <h2 className="text-white"> +52 55 5570-1197</h2>
                      </a>
                    </div>
                  </div>
          </div>

          <div className="footer_secction">
              {/* dudas */}
              <img src={hora} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-imges" />
              <div className="col-sm-12 col-md-6">
              <h5>Nuestros horarios</h5>
              <p>Lunes / Jueves 09:00 - 15:00</p>
              </div>
          </div>

          <div className="footer_secction">
              {/* direccion */}
              <a href="https://www.google.com/maps?ll=19.38668,-99.223983&z=16&t=m&hl=es&gl=MX&mapclient=embed&q=Ra%C3%BAl+Z%C3%A1rate+Machuca+11+Cuevitas+%C3%81lvaro+Obreg%C3%B3n+01220+Ciudad+de+M%C3%A9xico,+CDMX"
              target="_blank"
              rel="noreferrer follow"
              aria-label="Cómo llegar"
              >
              <img src={mapa} alt="Logo Grupo Intecsa ingenieria eléctrica" className="btn footer-imges" onClick={() => toggole()}/>
              </a>
                <div className="col-sm-12 col-md-6">
                <h5>Dirección</h5>
                <p className="col-12 col-sm-8">Raúl Zárate #11 Machuca Cuevítas, 01220 Ciudad de México, CDMX</p>
                </div>
            </div>      


          </div>
          
        </div>
        <div className="footer-licencia">
          <p className="text-center font-weight-bold">2021 - Grupo Intecsa</p>
        </div>
        
    </Fragment>
  )
}

export default React.memo(TheFooter)
