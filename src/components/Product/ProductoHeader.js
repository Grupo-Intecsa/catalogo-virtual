import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import mercadoLogo from 'assets/icons/mercado-libre-logo.svg'
import up from 'assets/icons/angle-up.svg'
import down from 'assets/icons/angle-down.svg'

import { AppContext } from 'context/AppContext'
import ButtonOption from 'reusable/ButtonOption'
import ItaAccordion from 'reusable/ItaAccordion'
import ShareButton from 'reusable/ShareButton'
import EmblaModal from 'components/EmblaCarousel/EmblaModal'


const ProducHeader = ({ data }) => {

  const { logoSelector, MlPrice, mlVerify } = useContext(AppContext)
  const { urlfoto, brand, title, desc, ml, _id, capacidad } = data
  const brandId = brand.map(item => item.brand_id)

  const [ cantidad, setCantidad ] = useState(1)
  const setAdd = () => cantidad < 5 && setCantidad(cantidad => cantidad + 1 )
  const setRemove = () => cantidad > 1 && setCantidad(cantidad => cantidad - 1 )
  
  return(
    <div className="product--foto">
      <section style={{ padding: "2rem"}}>

        <span className="migasdepan">HOME / CONTACTO / SWITCH </span>
        <EmblaModal  urlfoto={urlfoto} />
      </section>

      <section className="product--datos--venta">
        
        <section className="title--product">
          <span>{title} <ShareButton slug={_id} title={title}  /> </span>
          <div>{ logoSelector(brandId.toString()) }</div>
        </section>

        <section className="description--product">
          <p>{desc}</p>
        </section>

        <section>
          {/* TODO AÑADIR COMPONENTE DE OCULTACION! XD */}
            <ItaAccordion className="medidas--container" title="Elige Capacidad">
              <div className="medidas--items">
                <ButtonOption>{capacidad}</ButtonOption>
              </div>
            </ItaAccordion>
        </section>

        <section>
            <div className="precio--container">
              { mlVerify(ml) ? (
              <div>
                <span>Precio</span>
                <span style={{ fontWeight: "bold"}}>{<MlPrice ml={ml}/>}</span>
              </div>)
              : (
              <Link className="cotizalo--ahora">
                <div className="cotizalo--ahora">
                  <p>¡Comunicate con un expero y cotiza!</p>
                  <ico className="ico-bg-whastapp ico-bg-white"/>
                </div>
              </Link>
              )
              }
              <div>
              { mlVerify(ml) && (
                <div>
                    <a href={`https://articulo.mercadolibre.com.mx/MLM-${ml?.split("MLM")[1]}`} target="_blank" rel="noreferrer">
                        <img src={mercadoLogo} alt={title} className="btn-ecommerce" />
                    </a>
                </div>
                )}   
              </div>
            </div>
        </section>

        <section>
          <div className="control--btn--products">  
            <input value={`CANTIDAD: ${cantidad}`}/>

          <div className="btn--add--products">
            <button onClick={setAdd}><img src={up}/></button>
            <button onClick={setRemove}><img src={down}/></button>
          </div>              
                
          <button 
            className="btn btn-modal-comprar" 
            onClick={() => alert('comprado')}
            disabled={ mlVerify(ml) ? false : true }>
              Añadir <FontAwesomeIcon icon={ faShoppingCart }/>
          </button>
          </div>  
        </section>

        <section className="product--instrucciones">
          <span>
            <span><ico className="ico-bg-whastapp ico-bg-white"/><h4>PRODUCTOS PERSONALIZADOS</h4></span>
          </span>
          <p>Todos nuestros equipos pueden ser fabricados a medida, ¡cotiza ahora!</p>
        </section>

        <section className="product--instrucciones">
          <span>
            <span><ico className="ico-bg-truck ico-bg-white"/><h4>PLAZO DE ENTREGA</h4></span>
          </span>           
          <p>Pregunta por nuestros tiempos de entrega</p>
        </section>


        <section className="product--instrucciones">
          <span>
            <span><ico className="ico-bg-gasto ico-bg-white"/><h4>GASTOS DE ENVÍO</h4></span>
          </span>           
          <p>Envios gratis con Mercado Libre</p>
        </section>

      </section>
    </div>
  )
}


export default ProducHeader