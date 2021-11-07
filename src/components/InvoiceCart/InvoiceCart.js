import { useContext, useRef } from 'react'
import { AuthContext } from 'context/AuthContext'
import { useTiendaState, useTiendaDispatch } from 'context/TiendaContext'

// import MetodoPago from './forms/MetodoPago'
import DireccionEnvio from './forms/DireccionEnvio'
import GoogleAuth from './forms/GoogleAuth'

// error handled 
import HandledRedirectForm from './forms/HandledRedirectFrom'


const InvoiceCart = ({ history }) => {

  const { currentUser } = useContext(AuthContext)

  // refs
  const topPagoRef = useRef()
  const state = useTiendaState()
  const dispatch = useTiendaDispatch()

  console.log({ state, dispatch, currentUser, history })
  const { carrito, dataContent } = state.context

  const handleInvoice = () => {

    const total = Object.values(carrito)
    .map(({ cantidad, precio }) => cantidad * precio)
    .reduce((acc, current) => acc + current)

    const payload = {
      uuidUser: currentUser.uid,
      date: new Date(),
      total, 
      carrito,
      ...dataContent,
        name: currentUser.displayName,
        email: currentUser.email
    }
     dispatch('INVOICE_CREATE', { data: payload })

  }

  return(
    <>
    <div>
        <h1 className="title">Datos de envio y pago</h1>
    </div>
    <div className="invoice__container">   
      <div className="invoice__body" ref={topPagoRef}>

          {
            !currentUser && 
            <section className="google__credentials">
              <p>Para continuar y proteger tus datos inicia sesion con tu cuenta de Google</p>
              <GoogleAuth />   
            </section>
          }
      
      {
        currentUser && 
        <section className="data__google__user">
          <div>

            <span style={{ marginBottom: "30px" }} >
              <p>Nombre de la cuenta</p>
              <p>{ currentUser?.displayName }</p>
            </span>
            
            <span>
              <p>Correo de la cuenta</p>
              <p>{ currentUser?.email }</p>
            </span>

          </div>
          <div>
            <img src={currentUser?.photoURL}></img>
          </div>
        </section>
      }


      <section className="menu__secction__datos__form">
        <span>
            <p>Direccion y Facturación</p>
        </span>
        { currentUser && !state.matches('formSteps') && <DireccionEnvio /> }
      </section>
      <section className="menu__secction__datos__form">
        <span>
            {/* <p>Metodo de Pago</p> */}
            <p>Orden de compra</p>
        </span>

        { state.matches('formSteps') && (
          <div className="forma__pago">
          <p>En este momento estamos trabajando para que puedas hacer tu pago seguro por mercado Pago y Paypal</p>
          <p>Por el momento puedes generar tu <b>Orden de compra</b> y nos pondremos en contacto usted</p>
          <hr />
          <button onClick={handleInvoice}>Enviar Orden de Compra</button>
          </div>
        
        )}
      </section>

      </div>
  
      <HandledRedirectForm />
    </div>
    </>
  )
}

export default InvoiceCart