import { useTiendaState, useTiendaDispatch } from 'context/TiendaContext'
import DataPersonalForm from './forms/DataPersonalForm'
import DireccionEnvio from './forms/DireccionEnvio'

const InvoiceCart = () => {

  const state = useTiendaState()
  const dispatch = useTiendaDispatch()
  console.log({ state, dispatch })

  return(
    <>
    <div style={{ margin: "50px" }}>
        <h1 className="title">Datos de envio y pago</h1>
    </div>
    <div className="invoice__container">    
      <div className="invoice__body">
      <section>
        <DataPersonalForm />      
      </section>
      

      <section>
        <DireccionEnvio />
      </section>

      <section>
      <fieldset>
        <legend>Tipo de Pago</legend>
      </fieldset>

      <fieldset>
        <legend>Tipo de envío</legend>
      </fieldset>

    </section>      
      </div>
  

    </div>
    </>
  )
}

export default InvoiceCart