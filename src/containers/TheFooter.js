import React, { Fragment } from 'react'


const TheFooter = () => {
  return (
    <Fragment>
      <div className="footer--map mt-3">
        
        <div className="item-grid-map">
        <h5>INFORMACIÓN DE CONTACTO</h5>
            <iframe title="myMapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5322.527002406184!2d-99.22696839255828!3d19.38668419189787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d201adefab9513%3A0xa5936acc13a69c0d!2sRa%C3%BAl%20Z%C3%A1rate%20Machuca%2011%2C%20Cuevitas%2C%20%C3%81lvaro%20Obreg%C3%B3n%2C%2001220%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1613650539398!5m2!1ses!2smx" frameBorder="0" style={{ "border": "0" }} allowFullScreen="" aria-hidden="false" tabIndex="0" width="100%" height="100%"  ></iframe>
        </div>

        <div className="item-direccion" >
          <h5>Dirección</h5>
          <p>Raúl Zárate Machuca Cuevitas, 01220 Ciudad de México, CDMX</p>

          <h5>Teléfono</h5>
          <p>+52 55 55 70 11 97</p>

          <h5>Teléfono</h5>
          <p>+52 55 52 59 24 85</p>

          <h5>Email</h5>
          <p>contacto@grupintecsa.com</p>

          <h5>Email</h5>
          <p>servicio@grupintecsa.com</p>
        </div>

      </div>
      <div className="footer-footer">
          <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</a>
          <span className="ml-1">&copy; Carlos Chavez React Template cchavezmx@outlook.com</span>
      <div className="d-flex align-content-center">
      <span className="mr-1">Powered by</span>
            <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</a>
      </div>
      </div>
      
    </Fragment>
  )
}

export default React.memo(TheFooter)
