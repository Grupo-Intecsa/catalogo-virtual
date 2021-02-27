import React, { Fragment, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faPhone, faEnvelopeOpen, faMailBulk, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'



const TheFooter = () => {

  const [ hidden, setHidden ] = useState(false)

  const toggle = () => setHidden(!hidden)

  return (
    <Fragment>
      <div>

      <div className="d-flex justify-content-center">
        <div className="footer--hidden" onClick={toggle}>
            <span>Contactanos</span>
            <FontAwesomeIcon icon={faChevronCircleDown} />    
        </div>
        
      </div>
      

    { hidden && (  
      <Fragment>
        
      <div className="footer--map">
        <div className="item-grid-map">
        <h5>INFORMACIÓN DE CONTACTO</h5>
            <iframe title="myMapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5322.527002406184!2d-99.22696839255828!3d19.38668419189787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d201adefab9513%3A0xa5936acc13a69c0d!2sRa%C3%BAl%20Z%C3%A1rate%20Machuca%2011%2C%20Cuevitas%2C%20%C3%81lvaro%20Obreg%C3%B3n%2C%2001220%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1613650539398!5m2!1ses!2smx" frameBorder="0" style={{ "border": "0" }} allowFullScreen="" aria-hidden="false" tabIndex="0" width="100%" height="100%"  ></iframe>
        </div>

          
          <div className="item-direccion">
          <span className="d-flex">
          <FontAwesomeIcon className="mr-2" icon={faAddressCard} /><h6>Dirección</h6>
          </span>
          <p>Raúl Zárate Machuca Cuevitas, 01220 Ciudad de México, CDMX</p>

          <span className="d-flex">
          <FontAwesomeIcon className="mr-2" icon={faPhone}/><h6>Teléfono</h6>
          </span>
          <p>+52 55 55 70 11 97</p>

          <span className="d-flex">
          <FontAwesomeIcon className="mr-2" icon={faPhone}/><h6>Teléfono</h6>
          </span>
          <p>+52 55 52 59 24 85</p>

          <span className="d-flex">
          <FontAwesomeIcon className="mr-2" icon={faEnvelopeOpen}/><h6>Email</h6>
          </span>
          <p>contacto@grupintecsa.com</p>

          <span className="d-flex">
          <FontAwesomeIcon className="mr-2" icon={faMailBulk}/><h6>Email</h6>
          </span>
          <p>servicio@grupintecsa.com</p>

        </div>


    </div>
              <div className="footer-footer">
              <a 
                href="https://coreui.io"
                target="_blank"
                rel="noopener noreferrer">
                    <span className="text-dark">Grupo Intecsa es una marca Registrada</span>
                    <span className="ml-1">
                      &copy; <span className="text-info">by cchavezMX</span>
                    </span>
              </a>
              
          </div>
    </Fragment>
    )
    }

      </div>
    </Fragment>
  )
}

export default React.memo(TheFooter)
