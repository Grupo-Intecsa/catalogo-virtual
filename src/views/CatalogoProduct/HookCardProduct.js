import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'

import whataspp from '../../assets/icons/whatsapp.svg'
import mercadoLogo from '../../assets/icons/mercado-libre-logo.svg'

import { Modal } from 'antd';
import EmblaModal from '../../components/EmblaCarousel/EmblaModal'

import { CatalogoXstate } from '../../context/CatalogoXstate'
import { useMachine } from '@xstate/react'

// ESTE SE PUEDE EJECUTAR CON USECONTEXT

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

const ModalCapacidades = ({ isSelect, toogleModalCap, id }) => {

    const history = useHistory()

    const [ state, send ] = useMachine(CatalogoXstate)
    const [ selectValue, setSelectValue ] = useState("")
    const [ errorSelect, setErrorSelect ] = useState({})
    const { productsOfParent } = state.context

    useEffect(() => {
        send('GET_PRODUCTS_BY_PARENT_ID', { data: id })
    },[id])

    const productSelected = useMemo(() => {
        
        let select
        if(state.matches('success')){
            select = Object.values(productsOfParent).filter(item => item._id === selectValue ).map(value => {
                return { id: value._id, model: value.model, title: value.title }
            })
        }
        return select 

    },[selectValue])
    
    const handledOkButtom = () => {
        
        if(productSelected === undefined){
            return setErrorSelect({ error: "Debe seleccionar un valor para continuar" })
        }

        const id = productSelected?.map(({ id,...restOfData }) => id ).join("")
        // const title = productSelected?.map(({ title }) => title).join("")

        return history.replace({ 
                pathname: `/detalle/${id}/${'detalle'}`,
            })
    }

    return (
        <Modal
            okText="Ir"
            wrapClassName="supermodal" 
            title="Selecciona la capacidad que necesitas" 
            visible={isSelect} 
            onCancel={toogleModalCap} width={500}
            onOk={handledOkButtom}
            
            >
            
            <div className="hookCardModal">

            {errorSelect?.error && <span className="bg-danger p-2 text-center mb-1">{errorSelect.error}</span>}

            {
            state.matches('success') && (
                <>
                
                {productSelected?.map(({ model, title, id }) => {
                    return(
                        <div key={id} className="titulos__modal__hook">
                            <p>Nombre del Producto:</p><span>{title}</span>
                            <p>Modelo del Producto:</p><span>{model}</span>
                        </div>
                    )
                })}

                <select className="form-select form-select-lg mb-3" value={selectValue} onChange={(e) => setSelectValue(e.target.value)} >
                    <option 
                        value={0}
                        defaultValue={0}
                        selected
                        >Selecciona el amperaje</option>
                    {Object.values(productsOfParent).map(item => <option value={item._id}>{item.capacidad}</option>)}
                </select> 
                </>)   
            }
            </div>
        </Modal>
    )
}


const HookCardProduct = ({ data }) => {
    
    const { title, ml, desc, urlfoto, urldata, model, isKit, compatible, familia, _id } = data

    const [ leermas, setLeermas ] = useState(false)

    const phone = "5215546371510"
    const whatsappMessage = `https://api.whatsapp.com/send/?phone=${phone}&text=Me gustaria tener información del producto: ${title}`

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
                        {/* <span className="font-weight-bold mt-2 font-xl dispose-item text-center">
                            Disponible
                        </span> */}
                        
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
                    <a href={whatsappMessage} target="_blank" rel="noreferrer" className="btn btn-modal-contacto">
                            Cotizar <img src={whataspp} alt="logo whatsapp" style={{ "width": "20px"}} className="ml-1"/>
                    </a>
                </div>
                <div className="modal-aviso">
                    {/* donde comprar */}
                    <div>
                    {/*  Si existe codigo de mercado libre */}
                    { mlVerify(ml) && (
                        <div>
                            <p>Puedes adquirir nuestros productos en:</p>
                            <a href={`https://articulo.mercadolibre.com.mx/MLM-${ml?.split("MLM")[1]}`} target="_blank" rel="noreferrer">
                                <img src={mercadoLogo} alt={title} className="btn-ecommerce" />
                            </a>
                        </div>

                    )}                                                
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
                    <button  className="btn btn-facebook" onClick={toogleModalCap}>
                            Buscar Capacidad
                    </button>
                }
                </div>
            </div>

        </div>
    
    </Fragment>
        
    )
}

export default HookCardProduct