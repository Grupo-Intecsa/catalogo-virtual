import React, { useState } from 'react'
import { CCard, CCardHeader, CButton, CCollapse, CCardBody, CImg } from '@coreui/react'
import whataspp from '../../assets/icons/whatsapp.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faFilePdf, faEye, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'

const Card = ({ props }) =>{

    
    
    const { title, tags, ml, amazon, desc, urlfoto, urldata  } = props
    
    console.log(props, 'tarjetas, tarjetas ====>>>', ml.slice(3) )


    const [ accordion, setAccordion ] = useState(0)
    const [ toggle, setToggle ] = useState(false)

    const toggleAccord = () => {
        setAccordion(accordion === 0 ? 1 : 0 )
        setToggle(false)
    }

    const toggleDesc = () =>  {
        if(!toggle){
            setToggle(true)
        }else if (toggle){
            setToggle(false)
        }
    }

    const phone = "5215546371510"

    const whatsappMessage = `https://api.whatsapp.com/send/?phone=${phone}&text=Me gustaria tener inforamción del producto: ${title}`
        

    return(
        <CCard className="card--container">
        <CCardHeader id="headingTwo">
            <CButton 
            block 
            color="link" 
            className="text-left m-0 p-0 d-flex align-items-center justify-content-center" 
            onClick={toggleAccord}
            >
            {/* <div className="col-6 text-body d-flex flex-column"> */}
            <div className="card-display-grid">
                <p className="text--productos--title">
                    {title}
                </p>
                <div className="mt-1">
                <a href={whatsappMessage} target="blanc">
                    <button type="button" className="btn btn-pill mr-2 mt-3 bg--whass">
                    <img src={whataspp} alt="contacto de whatsapp" />
                </button>
                </a>
                <button type="button" className="btn btn-pill btn-warning mr-2 mt-3 disabled" ><FontAwesomeIcon className="mr-1" icon={faShoppingCart} style={{ "color" : "black"}}/></button>
                
                </div>
                {/* <span className="text-value-xl">
                    {`$${price}`}
                </span>
                <small className="text-danger">
                    {`Piezas disponibles: ${amount}`}
                </small> */}
            </div>
            <div className="col-4">
                <CImg src={urlfoto[0]} alt={tags} className="img-fluid" style={{ 'maxWidth': '100%' }} />
            </div>
            </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 1}>
            <CCardBody>
            <hr />
            <div className="text-body text-center" style={{ 'fontSize': 'large' }}>Compralo ahora en:</div>
            <div className="mt-4">
                { amazon ? null :  <CImg target="google.com" className="col-6 div--button" src='img/logo/amazon-2.svg' onClick={() => window.location.href=amazon} />}
                { !ml ? 
                    null :
                    <a className=" d-flex justify-content-center" href={`https://articulo.mercadolibre.com.mx/MLM-${ml.split("MLM")[1]}`} target="blanc">
                    <CImg className="col-6 div--button" src='img/logo/mercado-libre-logo.svg'/>
                    </a>
                }
            </div>
            <hr />
    
            <div className="btn-descrip" onClick={toggleDesc}>
                <div>Descripción:</div>
                <FontAwesomeIcon icon={faChevronCircleDown} />
            </div>
            </CCardBody>
            </CCollapse>
        <CCollapse show={toggle}>
            <CCardBody>
            <div>
            <span className="p2">{desc}</span>
            </div>
            <hr />
            {/* nav vertical */}
            <div className="d-flex justify-content-center">

                <a href={urldata} download={true} >
                <button type="button" className="btn btn-outline-danger mr-2" >
                <FontAwesomeIcon className="mr-1" icon={faFilePdf}/>
                    Descarga la Ficha técnica
                </button>
                </a>

                <button type="button" className="btn mr-2 btn-outline-dark" ><FontAwesomeIcon className="mr-1" icon={faEye}/>
                Galería</button>
            </div>
            </CCardBody>
        </CCollapse>
        </CCard>
    )
}

export default Card