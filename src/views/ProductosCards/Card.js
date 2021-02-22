import React, { useState } from 'react'
import { CCard, CCardHeader, CButton, CCollapse, CCardBody, CImg } from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpen, faShoppingCart, faFilePdf, faEye } from '@fortawesome/free-solid-svg-icons'

const Card = ({ props }) =>{

    const { title, tags, ml, amazon, img, content } = props

    const [ accordion, setAccordion ] = useState(0)    
        
    return(
        <CCard className="card--container">
        <CCardHeader id="headingTwo">
            <CButton 
            block 
            color="link" 
            className="text-left m-0 p-0 d-flex align-items-center justify-content-center" 
            onClick={() => setAccordion(accordion === 0 ? 1 : 0 )}
            >
            {/* <div className="col-6 text-body d-flex flex-column"> */}
            <div className="card-display-grid">
                <h1 className="text--productos--title">
                    {title}
                </h1>
                <div className="mt-1">
                <button onClick={() => alert('Contactanos al telefono')} type="button" className="btn btn-pill btn-primary mr-2 mt-3" style={{ "color" : "black"}}><FontAwesomeIcon className="mr-1" icon={faEnvelopeOpen} style={{ "color" : "white"}} />Contactanos</button>
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
                <CImg src={img} alt={tags} className="img-fluid" style={{ 'max-width': '80%' }} />
            </div>
            </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 1}>
            <CCardBody>
            <hr />
            <h3 className="text-body" style={{ 'fontSize': 'large' }}>Compralo ahora en:</h3>
            <div className="mt-4 d-flex justify-content-around">
                { amazon === null ? null :  <CImg target="google.com" className="col-4 div--button" src='img/logo/amazon-2.svg' onClick={() => window.location.href=amazon} />}
                { ml === null ? null : <CImg className="col-4 div--button" src='img/logo/mercado-libre-logo.svg' onClick={() => window.location.href=ml} />}
            </div>
            <hr />
            <div>
            <h3>Descripción</h3>
            <span className="p2">{content}</span>
            </div>
            <hr />
            {/* nav vertical */}
            <div className="d-flex justify-content-lg-around">
                <button type="button" className="btn btn-danger mr-2" ><FontAwesomeIcon className="mr-1" icon={faFilePdf} style={{ "color" : "white"}}/>Descarga la Ficha técnica </button>
                <button type="button" className="btn btn-info mr-2" ><FontAwesomeIcon className="mr-1" icon={faEye} style={{ "color" : "white"}}/>Galería</button>
            </div>
            </CCardBody>
        </CCollapse>
        </CCard>
    )
}

export default Card