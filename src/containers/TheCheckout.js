import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from 'context/AppContext'
import { useTiendaState, useTiendaDispatch } from 'context/TiendaContext'
import { Popover, InputNumber } from 'antd';

const TheCheckout = () => {
  
  const { monyIntlRef } = useContext(AppContext)
  const state = useTiendaState()
  const { carrito } = state.context
  
  // vaciar carrito
  const dispatch = useTiendaDispatch()
  const handleEmptyCart = () => {
    dispatch("EMPTY_CART")
  }

  // borrar un item
  const handleRemoveItem = (id) => {
    dispatch("REMOVE_ITEM", { id })
  }

  // cambiar cantidad de los productos
  const handledCantidad = ({ id, cantidad }) => {
    dispatch("CHANGE_CANTIDAD", { id, cantidad  })
  }

  // sumar carrito   
  const subtotal = carrito
  .map(({ precio, cantidad }) => precio * cantidad)
  .reduce((acc, val) => +acc + +val, 0)
  
   // menu contextual de articulo
  const Content = ({ prod }) =>{
    const { _id, title } = prod

    return(
      <div className="ntf--popup">
        <Link to={`/product/${_id}/name/${title}`}><p>Ver</p></Link>
        <p onClick={() => handleRemoveItem(_id)}>Borrar</p>
        <InputNumber
          color="back"
          min={1}
          max={5}
          defaultValue={ prod.cantidad }
          onChange={(e) => handledCantidad({ id: prod._id, cantidad: e })}
        />
    </div>
    )
  }

  return(
    <>
    <h1 className="title pt-3">CARRITO</h1>
    <div className="Chekout--container">
      <section className="carrito--items">
      { carrito.length > 0 && <span onClick={() => handleEmptyCart()}>Vaciar Carrito</span>}
        { carrito.length > 0 &&
          carrito.map((prod, index) => {
            const precio = monyIntlRef(prod.precio * prod.cantidad )

            return(
            <Popover 
              key={index + prod._id} 
              content={<Content prod={prod} /> }
              trigger="click"
              placement="rightBottom"
              >
              <div>
                <img className="foto" src={prod.foto}></img>
                <p className="title">{ prod.title }</p>
                <p className="catidad">{`Cantidad: ${ prod.cantidad }`}</p>
                <p className="precio">{ precio }</p>
              </div>
            </Popover>
            )
          })
        }
        {
          carrito.length === 0 &&
          <span>
            <p style={{ fontSize: "2rem" }}>Tu carrtio está vacío</p>
            <p>Entra y descubre más productos</p>
          </span>
        }
      </section>
      {/* flotante */}
      <section className="subtotal--items" hidden={ carrito.length > 0 ? false : true }>
          <span>
            <p>Subtotal</p>
            <p>{ monyIntlRef(subtotal) }</p>
          </span>
          <button>Generar orden de compra</button>
      </section>

    </div>
    </>
  )

}


export default TheCheckout