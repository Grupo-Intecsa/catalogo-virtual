import React, { createRef } from 'react'
import { useLocation } from 'react-router-dom'
import Pdf from 'react-to-pdf'
import logo from 'assets/icons/web-logo.webp'


const InvoiceCart = () => {
  
  const ref = createRef()
  const location = useLocation()
  const { payload } = location.state
  
  // console.log("[params]", payload)

  const getDate = () => {

    const date = Date.now()    
    const dateformat = new Intl.DateTimeFormat('es-MX', { dateStyle: 'full' }).format(date)
    return dateformat

  }

  return(
    
    <div>

      <div className="d-flex justify-content-center mt-3">
        <Pdf targetRef={ref} filename={`ITAMX_${Date.now()}.pdf`} >
          {({ toPdf }) => <button className="invoice-button-send" onClick={toPdf}>Descargar y Enviar PDF</button>}
        </Pdf>
      </div>

    <div ref={ref}>
          
<section className="back">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="invoice-wrapper">
          <div className="invoice-top">
            <div className="row">
              <div className="col-6">
                <div className="invoice-top-left">
                  <h2 className="client-company-name">Instalaciones Tecnologicas Aplicadas</h2>
                  <h6 className="client-address">La montaña, <br/>28 A, CP: 53340 <br/>México</h6>
                  <h4 className="font-weight-bold">Datos del Cliente</h4>
                  <h5>{payload.name}</h5> 
                  <span className="invoice-datos-cliente">{ payload.email } <br/> { payload.address } <br /> { payload.phone }</span>
                </div>
              </div>
              <div className="col-6">
                <div className="invoice-top-right">
                  <h2 className="our-company-name">Grupo Intecsa</h2>
                  <h6 className="our-address">grupointeca.com, <br/>contacto@grupointecsa.com<br/>CDMX - México</h6>
                  <div className="logo-wrapper">
                    <img src={logo} className="img-responsive pull-right logo" alt="Logo del invoice"/>
                  </div>
                    <div>
                      <p className="mt-3 w-100 invoice-date">{ getDate() }</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="invoice-bottom">
            <div className="row">
              <div className="col-12">
                <h5 className="invoice-title">Orde de Compra</h5>
              </div>
              <div className="clearfix"></div>

              <div className="col-3 col-3">
                <div className="invoice-bottom-left">
                  <h5>ITAMX No.</h5>
                  <h4>{Date.now()}</h4>
                </div>
              </div>
              <div className="col-offset-1 col-12 col-9 w-100">
                <div className="invoice-bottom-right">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Cantidad</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      { payload.carrito.map(item => {
                        return(
                          <tr>
                          <td>{item.cantidad}</td>
                          <td>{item.title}</td>
                          <td>{ item.precio === 0 ? <p>*Por cotizar</p> : item.precio }</td>
                        </tr>  
                        )
                      })}

                      {
                        payload.cotizar && (
                          <tr>
                          <td>1</td>
                          <td>Cotizar servicio de envio al codigo postal: { payload.cpostal }</td>
                          <td>*Por Cotizar</td>
                        </tr>  
                        )
                        
                      }                                            
                      <tr style={{"height": "40px"}}></tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th>Total</th>
                        <th></th>
                        <th>{ payload.total }</th>
                      </tr>
                    </thead>
                  </table>
                  <h4 className="terms">Terminos</h4>
                  <ul>
                    <li>El total de está orden de compra no representa el costo total de los materiales </li>
                  </ul>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="col-12">
                <hr className="divider"/>
              </div>
              <div className="col-4">
                <h6 className="text-left">itamx.com</h6>
              </div>
              <div className="col-4">
                <h6 className="text-center">contacto@grupointecsa.com</h6>
              </div>
              <div className="col-4">
                <h6 className="text-right">+52 55701197</h6>
              </div>
            </div>
            <div className="invoice-bottom-bar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
    </div>
  )
}

export default InvoiceCart