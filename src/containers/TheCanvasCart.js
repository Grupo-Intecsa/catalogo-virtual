import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTiendaState, useTiendaDispatch } from 'context/TiendaContext'
import { Badge } from 'antd'

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
          <span className="ico--carito"></span>
      </Badge>
    </Link>
    <NotifyCart />
    </>
    )
    
}

export default TheCanvasCart