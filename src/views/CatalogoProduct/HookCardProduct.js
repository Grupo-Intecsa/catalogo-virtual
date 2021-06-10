import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import whataspp from '../../assets/icons/whatsapp.svg'
import mercadoLogo from 'assets/icons/mercado-libre-logo.svg'

import EmblaModal from '../../components/EmblaCarousel/EmblaModal'
import ModalCapacidades from './ModalCapacidades'

import CatalogoController from 'context/controllers/CatalogoController'

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

    // 'si no hay precio en la BD y si hay codigo de ML lo extraemos'
    const [ mlPrecio, setMlPrecio ] = useState("Cargado...")
    async function getData(){
        await CatalogoController.getPrice({ ml })
        .then(res => setMlPrecio(res))
    }
    useEffect(() => {
        getData()        
    },[ml])    

    // para abrir nuevo elemento en nueva ventana debe estar dentro de un objecto
    const openInNewWindow = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if(newWindow) newWindow.opener = null
    }
    

    const [ cotizar, setCotizar ] = useState(false)
    const contactoToggle = () => setCotizar(!cotizar)

    const [ cantidadCompra, setCantidadCompra ] = useState(1)
    const handledCantCompra = (e) => {
        setCantidadCompra(e.target.value)
    }

    const dispatch = useTiendaDispatch()

    const hookSenderItemCart = ({ data, cantidad } = {}) => {

        let costo = () => {
            
            if(precio === 0 && typeof mlPrecio !== 'undefined'){
                if(Number.isNaN(+mlPrecio)){
                    
                    let number = mlPrecio.split(",")                
                    let suma = number[0] + number[1]

                    if(Number.isNaN(+suma)){
                        return 0
                    }else {
                        return +suma
                    }

                }else if(!Number.isNaN(+mlPrecio)){
                    
                    return +mlPrecio
                }
                
            }else if(precio > 0 ){
                
                return precio
            }
        }
                
        const payload = { ...data, cantidad: cantidad.cantidadCompra, precio: costo() }  
        dispatch("ADD_ITEM", { data: payload, id: payload._id })
        
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
                    {/* grid de fotos de productos*/}
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
                        {
                            precio === 0 && mlVerify(ml) &&
                                <span className="mt-2 text-black-50">
                                Precio: <p className="precioCard">{ `MXN$ ${mlPrecio}` }</p>
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
                    (isKit === false || typeof isKit === 'undefined') && (
                    <>
                    <div className="d-flex flex-column canvasCart" >
                    <label htmlFor="cantidad">Cantidad</label>
                    <div>
                    <select value={cantidadCompra} onChange={handledCantCompra} className="btn btn-modal-additem" id="cantidad">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                    <button className="btn btn-modal-comprar" onClick={() => hookSenderItemCart({ data: { title, _id, precio, foto: urlfoto[0] }, cantidad: { cantidadCompra }  })}>
                        Añadir <FontAwesomeIcon icon={ faShoppingCart }/></button>
                    </div>
                    </div>
                    {/* <button className="btn btn-modal-comprar" onClick={comprarToggle}>
                        Comprar <FontAwesomeIcon icon={ faShoppingCart }/>
                    </button> */}
                    </>
                    )
                }
                {/* { console.log("[Es Kit]", isKit)} */}
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
                    <>
                        <span className="btn btn-modal-pdf" onClick={() => openInNewWindow(urldata[0])}>
                                Ficha Técnica
                        </span>
                    </>
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