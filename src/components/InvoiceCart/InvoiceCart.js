import { useContext, useRef } from 'react'
import { AuthContext } from 'context/AuthContext'
import { useTiendaState, useTiendaDispatch } from 'context/TiendaContext'

import MetodoPago from './forms/MetodoPago'
import DireccionEnvio from './forms/DireccionEnvio'
import GoogleAuth from './forms/GoogleAuth'

const InvoiceCart = () => {

  const { currentUser } = useContext(AuthContext)

  // refs
  const topPagoRef = useRef()

  const state = useTiendaState()
  const dispatch = useTiendaDispatch()
  console.log({ state, dispatch, currentUser })

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
            <p>Metodo de Pago</p>
        </span>
        { state.matches('formSteps') && <MetodoPago topPagoRef={topPagoRef} /> }
      </section>

      </div>
  

    </div>
    </>
  )
}

export default InvoiceCart