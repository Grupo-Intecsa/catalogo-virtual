import React, { Fragment } from 'react'

import { CModal } from '@coreui/react'
import { useState } from 'react'

import logo from '../assets/icons/git_logo.svg'
import contacto from '../assets/social/contact.svg'
import mapa from '../assets/social/maps.svg'

import face from '../assets/social/facebook.svg'
import insta from '../assets/social/insta.svg'
import youtube from '../assets/social/youtube.svg'
import linkedin from '../assets/social/linkedin.svg'
import hora from '../assets/social/horarios.svg'

const MapaModal = ({ toggole, isMap }) => {

  return(
    <CModal show={isMap} onClose={() => toggole()} className="w-100">
      
      <div className="item-grid-map">
          <iframe title="myMapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5322.527002406184!2d-99.22696839255828!3d19.38668419189787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d201adefab9513%3A0xa5936acc13a69c0d!2sRa%C3%BAl%20Z%C3%A1rate%20Machuca%2011%2C%20Cuevitas%2C%20%C3%81lvaro%20Obreg%C3%B3n%2C%2001220%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1613650539398!5m2!1ses!2smx" frameBorder="0" style={{ "border": "0" }} allowFullScreen="" aria-hidden="false" tabIndex="0" width="100%" height="100%"  ></iframe>
      </div>
      
    </CModal>
  )
}

const TheFooter = () => {

  const [ isMap, setIsMap ] = useState(false)

  const toggole = () => setIsMap(!isMap)
  
  return (
    <Fragment>
        <div className="footer-main">

        <div className="w-25 d-flex justify-content-center align-items-center">
          <img src={logo} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-logo" />
        </div>
          <div className="footer-header">
              {/* header  */}
              <div className="footer_secction">
                <img src={contacto} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-imges" />
                  <div>
                  <h5>contacto@grupointecsa.com</h5>
                    <div className="d-flex flex-column">
                      <span>¿Tienes dudas? ¡Llámanos y te apoyamos!</span>
                      <h5> +52 55 5570-1197</h5>
                    </div>
                  </div>
              </div>
            <hr></hr>
            <div className="footer_secction">
              {/* dudas */}
              <img src={hora} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-imges" />
              <div>
              <h5>Nuestros horarios</h5>
              <p>Lunes / Viernes 09:00 - 18:00</p>
              </div>
            </div>
          </div>
          <div className="footer-bootom">
            <div className="footer_secction">
              {/* direccion */}
              <img src={mapa} alt="Logo Grupo Intecsa ingenieria eléctrica" className="btn footer-imges" onClick={() => toggole()}/>
                <div>
                <h5>Información de Contacto</h5>
                <p className="col-8">Raúl Zárate Machuca Cuevítas, 01220 Ciudad de México, CDMX</p>
                </div>
            </div>
            <hr></hr>
            
            <div >
              {/* redes sociales */}
              <h5 className="mb-3 text-center">Síguenos en:</h5>
              <div className="footer_secction d-flex justify-content-center">
                <ul>
                  <li>
                  <img src={face} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-redes" />
                  <img src={insta} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-redes" />
                  <img src={youtube} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-redes" />
                  <img src={linkedin} alt="Logo Grupo Intecsa ingenieria eléctrica" className="footer-redes" />
                  </li>
                </ul>
              </div>
            
              {/* logos de redes sociales */}
            </div>
            
            
          </div>
      
        </div>
        <div className="footer-licencia">
          <p className="text-center font-weight-bold">2021 - Grupo Intecsa</p>
        </div>
        <MapaModal toggole={toggole} isMap={isMap} />
    </Fragment>
  )
}

export default React.memo(TheFooter)
