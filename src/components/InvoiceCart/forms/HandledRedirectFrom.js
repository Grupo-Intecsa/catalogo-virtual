import { useHistory } from 'react-router-dom'
// import { AuthContext } from 'context/AuthContext'
import { useTiendaState } from 'context/TiendaContext'

const HandledRedirectForm = () => {

  const state = useTiendaState()
  // const dispatch = useTiendaDispatch()
  
  const { pdfFolio } = state.context
  
  const history = useHistory()
  const goHome = () => history.push('/')
  const goPedidos = () => history.push('/pedido/user')
    
  return (
    <div className={state.matches('pdfCreate') ? "redirect__container" : null }>
      { state.matches('error') &&
        <div>
          <p>
            Lo sentimos ha ocurrdio un error intentelo más tarde
          </p>
        </div>
      }
      {
        state.matches('pdfCreate') &&
        <div className="ntf__pdfCrate">
            <p>
              Tu orden de compra folio  <span>{ pdfFolio?.folio }</span>
              <br/> 
              fue enviado a tu correo eléctronico
            </p>
            <p>
              Recuerda visitar la seccion de pedidos para ver el estatus del tu orden de compra
            </p>
            <button onClick={goPedidos}>Pedidos</button>
            <button onClick={goHome}>Inicio</button>
        </div>
      }
  </div>
  )
}

export default HandledRedirectForm