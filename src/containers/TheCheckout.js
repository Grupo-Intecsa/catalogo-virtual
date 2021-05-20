import React, { useEffect, useState } from 'react'
import { useTiendaState, useTiendaDispatch } from 'context/TiendaContext'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'


import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

import { Alert, Switch } from 'antd'
import CardCheckout from 'views/ProductosCards/CardCheckout'

const FormOrdenCompra = ({ children, show }) => {

    
    return(
      <div hidden={ !show }>
        { children }
      </div>
    )
}

const TheCheckout = () => {

  useEffect(() => {
    let onTop = document.getElementById("topCheckout")
    onTop.scrollIntoView()
  },[])

  const [ show, setShow ] = useState(false)
  const handleCloseFrom = () => carrito.length > 0 ? setShow(!show) : null

  const monyIntlRef = (precio) => {

    let miPrecio 
    if(isNaN(precio) || precio === 0 ){
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

  const dispatch = useTiendaDispatch()
  const handleEmptyCart = () => {
    dispatch("EMPTY_CART")
  }

  // componente para envio de datos
  const [ cotizar, setCotizar ] = useState(true)

  const handleCotizar = (checked) => {
    setCotizar(checked)
  }

  const state = useTiendaState()
  const { carrito } = state.context

  const schemaValidation = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().email().required()
  })

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schemaValidation)
  })

  //  handle submit de fomrulario
  
  const getDate = () => {

    const date = Date.now()    
    const dateformat = new Intl.DateTimeFormat('es-MX', { dateStyle: 'full' }).format(date)
    return dateformat

  }

  const [ payload, setPayload] = useState([])

  const history = useHistory()
  const onSubmit  = (data) => {
    let total = monyIntlRef(sumaCuentaCarrito())
    const payload = { ...data, cotizar, carrito, total, date: getDate() }
    setPayload(payload)

    dispatch("INVOICE_CREATE", payload )    
  }

  useEffect(() => {
    if(state.matches("pdfCreate")){

      const folio = state.context && state.context.pdfFolio
      return history.push({ pathname: `/checkout/invoice/${folio}`, state: { payload }})
      
    }
  },[state.value])

  return(
    <div className="checkout--container" id="topCheckout">
      
      <div>
        <h4>Materiales seleccionados</h4>
        { carrito.length === 0 
          ? <Alert message="Tu carrito está vacío" type="info" showIcon />
          : Object.values(carrito).length > 0 && (
            Object.values(carrito).map(( item ) => {
              return(
                <CardCheckout item={item} />
              )
            })

          )
        }
        {
          carrito.length > 0 && <span className="cut--text--title" onClick={handleEmptyCart}>Vaciar carrito</span>
        }
      </div>

      <div className="check--header--title">
        <h4>Orden de Compra</h4>
        <small className="font-weight-bold">*El costo puede variar si tiene partidas pendientes por cotizar</small>
        <span className="p-3 text-center">Subtotal: <br/> {monyIntlRef(sumaCuentaCarrito())}</span>
        <div className="chek--control--area">
          <button className="btn-chek-pedido" onClick={handleCloseFrom}>Siguiente paso</button>
          {/* <button className="btn-chek-pedido">Cancelar</button> */}
        </div>
        
          <FormOrdenCompra show={show}>
            <div className="form-oc">
                <form onSubmit={handleSubmit(onSubmit)}>
                
                <section>
                  <label htmlFor="name">Nombre</label>
                  <input id="name" name="name" type="text" ref={register}></input>
                  <p>{errors.name && errors.name.message }</p>
                </section>

                <section>
                  <label htmlFor="address" >Dirección</label>
                  <input id="address" name="address" type="text" ref={register}></input>
                  <p>{errors.address && errors.address.message }</p>
                </section>

                <section>
                  <label htmlFor="cpostal" >CP</label>
                  <input id="cpostal" name="cpostal" type="text" ref={register}></input>
                  <p>{errors.postal && errors.postal.message }</p>
                </section>

                <section>
                  <label htmlFor="phone">Número de Contacto</label>
                  <input id="phone" name="phone" type="text" ref={register} ></input>
                  <p>{errors.phone && errors.phone.message }</p>
                </section>

                <section>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" ref={register} ></input>
                  <p>{errors.email && errors.email.message }</p>
                </section>

                <div>
                  <label>Cotizar envío</label>
                  <Switch 
                    className="sw--button"
                    onChange={handleCotizar}                    
                    defaultChecked
                      // checked={field.value}
                    />                  
                  {/* <CSwitch className={'mx-1'} variant={'3d'} color={'info'} defaultChecked /> */}
                </div>

                  <button className="btn-chek-pedido" type="submit">Enviar Orden de Compra</button>

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