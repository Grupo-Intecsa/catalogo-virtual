import React, { Fragment, useEffect, useState } from 'react'
import { useTiendaState, useTiendaDispatch } from 'context/TiendaContext'
import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

// componente de diseño
import { Drawer, Badge, Alert } from 'antd'

export default function TheCanvasCart(){

  const handleAddCard = (e) => {
      console.log(e)
  }

  const monyIntlRef = (precio) => {

    let miPrecio 
    if(isNaN(precio) || precio === 0){
      return miPrecio = <span style={{ color: "red", fontWeight: "bold"}}>Por cotizar*</span>
    }else{
      miPrecio = precio
    }
    const number = new Intl.NumberFormat('en-MX', { style:"currency", currency: "MXN"}).format(miPrecio)
    return number
  }

  const sumaCuentaCarrito = () => {
    if(Object.values(carrito).length > 0){
      const suma = Object.values(carrito)
      .map(( item ) => {
        const precios = []
        if(typeof item.precio === "undefined"){
          
          precios.push(0)
        } else {
          precios.push(item.precio * item.cantidad)
        }
        
        return precios  
      })
      .reduce((prev, current) =>  ( Number(prev) + Number(current) ) )

      return suma.toString()

    }else {
      return null
    }
  }

  const [ close, setClose ] = useState(false)
  const handledClose = () => setClose(!close)
  
  const state = useTiendaState()
  const dispatch = useTiendaDispatch()

  const { carrito, item } = state.context
  
  useEffect(() => {

    const localCarrito = JSON.parse(localStorage.getItem("localCarrito"))

    if(localCarrito && Object.values(carrito).length === 0 ){
      dispatch("HYDRATE", { payload: Object.values(localCarrito) })
    }
  },[])
  
  useEffect(() => {
    if(Object.values(carrito).length > 0 ){
      handledClose()
    }
  },[item])

  useEffect(() => {
    if(state.matches("rejected")){
      handledClose()
    }
  },[state.value])

  const concatTitle = (string) => {
    let concatTitle
    const titleString = string.split(" ")
    
    if(titleString.length > 10 ){
      concatTitle = titleString.slice(0, titleString.length / 2 ).join(" ") + "..."
    }else {
      concatTitle = string
    }
    
    return concatTitle

  }

  const history = useHistory()
  const goToCheckout = () => {
        history.replace({ pathname: "/cart/checkout" })
        handledClose()
  }
  
  return (
    <Fragment>
      
          <div className="align-content-center">
            <div className="shoppingCart" onClick={() => handledClose()}>
            <Badge count={Number(Object.values(carrito).length)} offset={[10, 10]}>
              <FontAwesomeIcon icon={faShoppingCart} color="white" size="2x" />
              
            </Badge>
              
            </div>
            <Drawer 
              // title="pobando Carrito"
              placement="right"
              onClose={handledClose}
              visible={close}
              width="80%"
              
            >    
              <div className="d-flex flex-column">
                <div className="menu--canvas--cart">    
                <span className="p-3 text-center">Subtotal: <br/> {monyIntlRef(sumaCuentaCarrito())}</span>
              
              </div>
              
                <div className="d-flex justify-content-center mt-3 w-100">
                  {
                    state.matches("rejected") && (
                        <Alert
                          className="reject--canvas"
                          message="¿quieres incluir mas piezas?"
                          description={`Ya has agregado ${item.title}`}
                          type="info"
                          showIcon
                        />)
                    }
                </div>
              
                <div className="text-center font-weight-bold">
                  {
                    carrito.length === 0 && <Alert message="Tu carrito está vacío" type="info" showIcon />
                  }
                </div>

                  {
                    Object.values(carrito).map((item, index) => {
                      
                      return(
                        <div key={index + item.title} className="EmblaModald-flex justify-content-center">
                            {/* meter reduce para la suma de los datos */}
                          <div className="canvasBodyContainer">
                            <p>{concatTitle(item.title)}</p>
                            <span>{monyIntlRef(item.precio * item.cantidad)}</span>

                            <hr/>

                            <div className="canvas--bottom">
                              <img src={item.foto} alt={item.title} />  
                              <select value={item.cantidad} className="btn btn-modal-additem" id="cantidad" onChange={(e) => handleAddCard(e)}>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                              </select>
                            </div>
                          </div>
                      </div>
                      )
                    })
                    
                  }
                  <div className="d-flex justify-content-center">
                    <button className="btn-modal-carrito"  onClick={goToCheckout}>Crear pedido</button>
                  </div>
                  <small className="text-center">*No tenemos piezas en existencia o el costo del producto debe ser actualizado.<br /> Nuestro personal le enviará el costo del producto y tiempos de entrega.</small>
            </div> 
            
            </Drawer>
            </div>      
    </Fragment>
  )
}