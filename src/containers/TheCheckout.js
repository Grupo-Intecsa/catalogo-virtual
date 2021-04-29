import React, { useState } from 'react'
import { useTiendaState } from 'context/TiendaContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import { useForm } from 'react-hook-form'

import {
  CSwitch
} from '@coreui/react'

const FormOrdenCompra = ({ children, show }) => {

    
    return(
      <div hidden={ !show }>
        { children }
      </div>
    )
}




const CardCheckout = ({ item }) => {
  
  const [ borrar, setBorrar ] = useState(false)
  const handledBorar = () => setBorrar(!borrar)

  const monyIntlRef = (precio) => {

    let miPrecio 
    if(isNaN(precio)){
      return miPrecio = <span style={{ color: "red", fontWeight: "bold"}}>Por cotizar*</span>
    }else{
      miPrecio = precio
    }
    const number = new Intl.NumberFormat('en-MX', { style:"currency", currency: "MXN"}).format(miPrecio)
    return number
  }

  return(
    <div className="check--list">
      <p>{item.title}</p>
    <div className="check--list-middle">
      <div>

      <span>Cantidad:  
          <select>
              <option>{item.cantidad}</option>
          </select>    
      </span>
      <span className="btn"><FontAwesomeIcon icon={faTrashAlt} size="1x" onClick={handledBorar} /></span>
      { borrar 
          ? <div className="chek--control--del">
              <small className="font-weight-bold" style={{ "color": "red"}}>¿Está seguro que desea eliminar?</small>
              <div>
                <span className="ml-1 btn"><FontAwesomeIcon icon={faTimes} /> Si</span>
                <span onClick={handledBorar} className="ml-1 btn"><FontAwesomeIcon icon={faCheckCircle} /> No</span>
              </div>
            </div>  
          : null }
      </div>
      <span>{monyIntlRef(item.precio * item.cantidad)}</span>
    </div>
    </div>
  )
}



const TheCheckout = () => {

  const [ show, setShow ] = useState(false)
  const handleCloseFrom = () => setShow(!show)

  const monyIntlRef = (precio) => {

    let miPrecio 
    if(isNaN(precio)){
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
      .map(({ item }) => {
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

  const state = useTiendaState()
  const { carrito } = state.context

  const { handleSubmit, register } = useForm()
  const onSubmit  = (data) => {
    console.log(data)
  }

  return(
    <div className="checkout--container">

      <div>
        {
          Object.values(carrito).length > 0 && (
            Object.values(carrito).map(({ item }) => {
              return(
                <CardCheckout item={item} />
              )
            })

          )
        }
      </div>

      <div className="check--header--title">
        <h4>Orden de Compra</h4>
        <small className="font-weight-bold">*El costo puede variar si tiene partidas pendientes por cotizar</small>
        <span className="p-3 text-center">Total: <br/> {monyIntlRef(sumaCuentaCarrito())}</span>
        <div className="chek--control--area">
          <button className="btn-chek-pedido" onClick={handleCloseFrom}>Siguiente paso</button>
          {/* { JSON.stringify(carrito, null) } */}
          {/* <button className="btn-chek-pedido">Cancelar</button> */}
        </div>
          <FormOrdenCompra show={show}>
            <div className="form-oc">
                <form onSubmit={onSubmit(handleSubmit)}>
                
                <section>
                  <label>Nombre</label>
                  <input></input>
                </section>

                <section>
                  <label>Direccion</label>
                  <input></input>
                </section>

                <section>
                  <label>Numero de Contacto</label>
                  <input></input>
                </section>

                <div>
                  <label>Cotizar envio</label>
                  <CSwitch className={'mx-1'} variant={'3d'} color={'info'} defaultChecked />
                </div>

                  <button className="btn-chek-pedido">Enviar Orden de Compra</button>

                </form>
            </div>
          </FormOrdenCompra>
      </div>
        <div className="footer--carrito"></div>
      
      {/* un letrero con el total de cosas */}

    </div>
  )

}


export default TheCheckout