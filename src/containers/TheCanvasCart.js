import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTiendaState, useTiendaDispatch } from 'context/TiendaContext'

import { Badge } from 'antd'
import icoCart from 'assets/icons/cart.svg'

const TheCanvasCart = () => {
  const dispatch = useTiendaDispatch()
  const state = useTiendaState()

  const { carrito, openNotify } = state.context


  useEffect(() => {
    const localCarrito = JSON.parse(localStorage.getItem("localCarrito"))
    if(localCarrito && Object.values(carrito).length === 0 ){
      dispatch("HYDRATE", { payload: Object.values(localCarrito) })
    }
  },[])
  
  const NotifyCart = () => {

    const lastElementAdd = carrito.slice(carrito.length - 1, carrito.length)
    return (
      <div className="notify--cart" hidden={ openNotify } id="notify">
        <span style={{ fontSize: "large" }}>¡Agragaste un artículo a tu carrito!</span>
        {
          lastElementAdd.map((prod, index) => {
            return (
              <div key={index}>
                <span>
                  <img src={prod.foto} alt={prod.title} className="ntf--foto"/>
                </span>
                <p className="ntf--title">
                  {prod.title}
                </p>
              </div>
            )
          })
        }
      </div>
    )
}
  

  return (
    <>
    <Link to="/cart/checkout">
      <Badge count={Number(Object.values(carrito).length)} offset={[10, 10]}>
          <img src={icoCart} alt="entra al carrito" style={{ cursor: "pointer", width: "2.5rem", height: "2.5rem" }} />
      </Badge>
    </Link>
    <NotifyCart />
    </>
    )
    
}

export default TheCanvasCart