import { useEffect } from 'react'
import utils from 'utils/utils'


const MetodoPago = ({ topPagoRef }) => {

    useEffect(() => {
    utils.scrollTotop(topPagoRef)
  }, [])
 
  return (
    <div className="formulario__carito__pago"> 
      <input placeholder="Numero de tarjeta"></input>
    </div>
  )
}

export default MetodoPago
