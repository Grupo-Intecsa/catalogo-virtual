import React, { useContext, useState, useRef } from 'react'

import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import mercadoLogo from 'assets/icons/mercado-libre-logo.svg'
import up from 'assets/icons/angle-up.svg'
import down from 'assets/icons/angle-down.svg'

import { AppContext } from 'context/AppContext'
import ShareButton from 'reusable/ShareButton'
import EmblaModal from 'components/EmblaCarousel/EmblaModal'
import MenuBreadCrumb from 'components/MenuBreadCrumb'

import { useTiendaDispatch, useTiendaState } from 'context/TiendaContext'


const ProducHeader = ({ data }) => {

  const { logoSelector, GetPriceIdMl, mlVerify, contactRequired, monyIntlRef } = useContext(AppContext)
  const { urlfoto, brand, title, desc, ml, _id, inglesTitle, inglesDesc } = data
  const brandId = brand.map(item => item.brand_id)

  console.log({ brandId })

  const [ cantidad, setCantidad ] = useState(1)
  const setAdd = () => cantidad < 5 && setCantidad(cantidad => cantidad + 1 )
  const setRemove = () => cantidad > 1 && setCantidad(cantidad => cantidad - 1 )

  const { loading, mlError, mlPrecio } = GetPriceIdMl({ ml })

  // para cambiar la cantidad de productos en el canasto
  const handleAddProductos = (e) => {
    console.log(e.target.value)
  }

  const state = useTiendaState()      
  const dispatch = useTiendaDispatch()

  const notifyRef = useRef(document.getElementById("notify")) 
  const setItemInCart = () => {
    let payload = {
      title,
      _id, 
      precio: mlPrecio,
      foto: urlfoto[0],
      cantidad
    }

    dispatch("ADD_ITEM", { data: payload, ref: notifyRef })
  }

  const { form, whatsapp } = contactRequired()

  const handleFormLik = () => {
    window.open(form, '_blank')
  }

  const handleWhatsapp = () => {
    window.open(whatsapp, '_blank')
  }  

  const [swLenguage, setLenguage] = useState(false)
  const swToggle = () => {
    setLenguage(!swLenguage)
  }
  
  return(
    <div className="product--foto">
      <Helmet
        meta={
          [
            {
              name: "og:image",
              content: `${urlfoto[0]}`
              
            }
          ]
        }
      >

      </Helmet>
      <section style={{ padding: "2rem"}}>

        <MenuBreadCrumb />
        <EmblaModal  urlfoto={urlfoto} />
      </section>

      <section className="product--datos--venta">
        
        <section className="title--product">
          <ShareButton slug={_id} title={title}  /> 

          <nav className="swtich__lenguage">
            <span className="flag__mex" />
            <input 
                onChange={(e) => swToggle(e)}
                type="checkbox"
                id="switch" 
              />
            <label htmlFor="switch">toogle</label>
            <span className="flag__usa" />
          </nav>

          <span>{swLenguage ? inglesTitle : title }</span>
          <div>{ logoSelector(brandId.toString()) }</div>
        </section>

        { state.matches("rejected") && <span className="ntf--exist">Este producto ya está en tu carrito</span>}

        <section className="description--product">
          <p>{swLenguage ? inglesDesc : desc }</p>
        </section>
{/* 
// Accordion con las capacidades
        <section>
            <ItaAccordion className="medidas--container border--selected" title="Elige Capacidad">
              <div className="medidas--items">
                {
                  capacidad.map((item, index) => {
                    return (
                      <ButtonOption 
                        key={index} 
                        isSelected={ index === 0 ? true : false}>
                        {(`${item.cap} ${item.unidad}`).toString()}
                      </ButtonOption>
                    )
                  })
                }
              </div>
            </ItaAccordion>
        </section> */}

        <section>
            <div className="precio--container">
              { mlVerify(ml) && !mlError ? (
              <div>
                <span>Precio</span>
                { loading ? <span style={{ fontWeight: "bold"}}>{monyIntlRef(mlPrecio * cantidad)}</span> : <span>Cargando...</span> }
              </div>)
              : (
              <button className="cotizalo--ahora">
                <div className="cotizalo--ahora" onClick={handleFormLik}>
                  <p>¡Comunicate con un expero y cotiza!</p>
                </div>
              </button>
              )
              }
              <div>
              { mlVerify(ml) && !mlError && (
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
            <input value={`CANTIDAD: ${cantidad}`} onChange={(e) => handleAddProductos(e)}/>
          <div className="btn--add--products">
            <button onClick={setAdd}><img src={up}/></button>
            <button onClick={setRemove}><img src={down}/></button>
          </div>
                
          <button 
            className="btn btn-modal-comprar" 
            onClick={() => setItemInCart()}
            disabled={ mlVerify(ml) && !mlError && loading ? false : true }>
              Añadir <FontAwesomeIcon icon={ faShoppingCart }/>
          </button>
          </div>  
        </section>
        <section className="product--instrucciones">
          <span>
            <span onClick={handleWhatsapp}><i className="ico-bg-whastapp ico-bg-white"/><h4>PRODUCTOS PERSONALIZADOS</h4></span>
          </span>
          <p>Todos nuestros equipos pueden ser fabricados a medida, ¡cotiza ahora!</p>
        </section>

        <section className="product--instrucciones">
          <span>
            <span><i className="ico-bg-truck ico-bg-white"/><h4>PLAZO DE ENTREGA</h4></span>
          </span>           
          <p>Pregunta por nuestros tiempos de entrega</p>
        </section>


        <section className="product--instrucciones">
          <span>
            <span><i className="ico-bg-gasto ico-bg-white"/><h4>GASTOS DE ENVÍO</h4></span>
          </span>           
          <p>Envios gratis con Mercado Libre</p>
        </section>

      </section>
    </div>
  )
}


export default ProducHeader