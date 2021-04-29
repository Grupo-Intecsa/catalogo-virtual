import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import whataspp from '../../assets/icons/whatsapp.svg'
import mercadoLogo from 'assets/icons/mercado-libre-logo.svg'


import EmblaModal from '../../components/EmblaCarousel/EmblaModal'
import ModalCapacidades from './ModalCapacidades'

// formulario de contacto
import FormContact from 'views/FormContact'

// ESTE SE PUEDE EJECUTAR CON USECONTEXT
import { useTiendaDispatch } from 'context/TiendaContext'

const mlVerify = ( item ) => {
// verificamos si es un array y esta vacio
if(Array.isArray(item)){
    if(item.length === 0){
        return false
    }
//       verificamos si es null
}else if(item === null){
    return false
//       Verificamos si es un objeto y esta vacio      
}else if(Object.values(item).length === 0){
    return false
//       Verificamos si e el item es un string llamado null
}else if( item === "null"){
    return false
// si todo esta bien regresamos el objeto      
}else {
    return true
}
}

const monyIntlRef = (precio) => {
    const number = new Intl.NumberFormat('en-MX', { style:"currency", currency: "MXN"}).format(precio)
    return number
}

const HookCardProduct = ({ data }) => {
    
    const { title, ml, desc, urlfoto, urldata, model, isKit, compatible, familia, _id, precio } = data
    
    const [ cotizar, setCotizar ] = useState(false)
    const contactoToggle = () => setCotizar(!cotizar)

    const [ cantidadCompra, setCantidadCompra ] = useState(1)
    const handledCantCompra = (e) => {
        setCantidadCompra(e.target.value)
    }

    const dispatch = useTiendaDispatch()
    
    const hookSenderItemCart = ({ data, cantidad } = {}) => {

        const payload = { ...data, cantidad: cantidad.cantidadCompra }
        dispatch("ADD_ITEM", { payload, id: payload._id })     
    }
    

    const [ leermas, setLeermas ] = useState(false)

    const history = useHistory()

    const [ isSelect, setIsSelect ] = useState(false)
    const toogleModalCap = () => setIsSelect(!isSelect)

    return (
    <Fragment>
    
    <ModalCapacidades isSelect={isSelect} toogleModalCap={toogleModalCap} id={_id} />

        <div className="modal--title-product">

            <button className="btn btn-ghost-info d-flex align-items-center p-2" onClick={() => history.goBack()}>
                <FontAwesomeIcon icon={faCaretLeft} size="3x"></FontAwesomeIcon>
                <span className="font-weight-bold ml-1">Regresar</span>
            </button>
        </div>

        <div className="modal--productos">

            <div  className="modal-ca">
            {/* galeria */}
                <div className="modal-carousel">
                    <EmblaModal urlfoto={urlfoto} />
                </div>
            
            </div>
            
            <div  className="modal-cb">
            {/* titulo y descripcion */}
            <div className="modal-datos">
            
                <h1 className="texto-title-neibor text-uppercase">{title}</h1>
            
                {/* modelo y disponibilidad */}
                    <div className="modal--dispose">
                        { precio >  0 && 
                            <span className="mt-2 text-black-50">
                            Precio: <p className="precioCard">{`${monyIntlRef(precio)}`}</p>
                            </span>
                        }
                        
                        <span className="mt-2 text-black-50">
                            Código: <p className="font-weight-bold mb-4 text-uppercase">{model}</p>
                        </span>

                        { isKit &&
                            <span className="mt-2 text-black-50">
                                Familia:  <p className="font-weight-bold mb-4">{familia}</p>
                            </span>
                        }
                    </div>
            </div>                        
                {/* descripcion */}
                <div className="modal-desc">
                    <span className={ leermas ? "text-justify" : "text-justify desc-module line-clamp"}>{desc}</span>
                    <span className="leermas TE" onClick={() => setLeermas(!leermas)}>{ leermas ? "MOSTRAR MENOS" : "MOSTRAR MÁS"}</span>
                </div>
            </div>

            <div  className="modal-cc">
                {/* contacto ecomerce */}
                <div className="modal-botonera">
                <button className="btn btn-modal-contacto" onClick={contactoToggle}>
                        Cotizar <img src={whataspp} alt="logo whatsapp" style={{ "width": "20px"}} className="ml-1"/>
                    </button>
                    <FormContact visible={cotizar} contactoToggle={contactoToggle} title={title} />
                {
                    mlVerify(ml) && (
                    <>
                    <div className="d-flex flex-column canvasCart" >
                    <label htmlFor="cantidad">Cantidad</label>
                    <div>
                    <select value={cantidadCompra} onChange={handledCantCompra} className="btn btn-modal-additem" id="cantidad">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                    <button className="btn btn-modal-comprar" onClick={() => hookSenderItemCart({ data: { title, _id, precio }, cantidad: { cantidadCompra }  })}>
                        Añadir <FontAwesomeIcon icon={ faShoppingCart }/></button>
                    </div>
                    </div>
                    {/* <button className="btn btn-modal-comprar" onClick={comprarToggle}>
                        Comprar <FontAwesomeIcon icon={ faShoppingCart }/>
                    </button> */}
                    </>
                    )
                }
                </div>
                <div className="modal-aviso">
                    {/* donde comprar */}
                    <div>
                    {/*  Si existe codigo de mercado libre */}
                    </div>
                    <div>
                    {/*  si es Kit y tiene lista de compatibilidad */}
                        {
                            Array.isArray(compatible) && compatible.length > 0  && (
                                <>
                                <h3 className="texto-title-neibor">Codigos Compatibles</h3>
                                <div className="ventana__familia">
                                    
                                    <lo>
                                    {compatible?.map(item => 
                                        <li>{item}</li>
                                    )}
                                    </lo>
                                </div>
                            </>
                            )
                        }
                    </div>
                </div>
                
            </div>
            <div  className="modal-cd">
            <div className="modal-ficha">
                    {/* Si hay pdf */}
                    {
                        Array.isArray(urldata) && urldata.length > 0 && (
                            
                    <a href={urldata[0]} target="_blank" rel="noreferrer" className="btn btn-modal-pdf">
                        Ficha Técnica
                    </a>
                        )
                    }
                    

                { isKit &&
                    <button  className="btn btn-modal-capacidad" onClick={toogleModalCap}>
                            Capacidad
                    </button>
                }
                </div>
                <hr/>
                {
                    isKit && (
                        <p><span className="font-weight-bold">Este producto cuenta con diferentes capacidad o medidas que puedes comprar a través de Mercado Libre</span><br/> Selecciona la capacidad que necesitas y verifica si lo tenemos en existencia en Mercado Libre o puedes cotizarlo directo con el botón de cotizar</p>
                    )

                }
                <div className="d-flex justify-content-center">
                { mlVerify(ml) && (
                        <div>
                            <p className="text-center">Puedes adquirir nuestros productos <br></br> a meses sin intereses en:</p>
                            <a href={`https://articulo.mercadolibre.com.mx/MLM-${ml?.split("MLM")[1]}`} target="_blank" rel="noreferrer">
                                <img src={mercadoLogo} alt={title} className="btn-ecommerce" />
                            </a>
                        </div>

                )}   
                </div>            
            </div>

        </div>
    
    </Fragment>
        
    )
}

export default HookCardProduct