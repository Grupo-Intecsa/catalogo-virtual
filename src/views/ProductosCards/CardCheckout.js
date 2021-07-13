
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useTiendaDispatch } from 'context/TiendaContext'

const CardCheckout = ({ item }) => {

  const dispatch = useTiendaDispatch()
  
  const [ borrar, setBorrar ] = useState(false)
  const handledBorar = () => setBorrar(!borrar)

  const handledReset = ({ id } = {}) => {
    dispatch("REMOVE_ITEM", { id: id })
    handledBorar()
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

  const linkName = item.title.replace(/[^a-zA-Z 0-9]+/g,'').trim().split(" ").join("-")


  return(
    <div className="check--list">

    <div className="card-list-img">
      <img src={item?.foto} alt="imagen de muestra"/>
    </div>

    <div className="card-list-options">
      
      <span className="cut--text--title">
      <Link 
          to={`/detalle/${item._id}/${linkName}`} 
          className="cut--text--title"
          >
          <p>{item.title}</p>
      </Link>
      </span>
        
      <span className="cart-precio">{monyIntlRef(item.precio * item.cantidad)}</span>
      <hr/>
      {/* row */}
      <div className="card--list--data">
      <span>Cantidad:  
          <select>
              <option>{item.cantidad}</option>
          </select>    
      </span>
      <span className="btn" onClick={() => handledReset({ id: item._id })} ><FontAwesomeIcon icon={faTrashAlt} size="1x" onClick={handledBorar} /></span>
      {/* { borrar 
          ? <div className="chek--control--del">
              <small className="font-weight-bold" style={{ "color": "red"}}>¿Está seguro que desea eliminar?</small>
              <div>
                <span onClick={() => handledReset({ id: item._id })} className="ml-1 btn"><FontAwesomeIcon icon={faTimes} /> Si</span>
                <span onClick={handledBorar} className="ml-1 btn"><FontAwesomeIcon icon={faCheckCircle} /> No</span>
              </div>
            </div>  
          : null } */}
      </div>
    </div> 
    
    </div>
  )
}

export default CardCheckout