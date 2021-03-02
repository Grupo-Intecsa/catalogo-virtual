import React, { Fragment, useState } from 'react'
import { 
    CCard,
    CCardHeader,
    CCollapse,
    CCardBody,
    CImg,
    CModal,
    CModalHeader,
    CModalBody,
    CModalTitle,
    CCarousel,
    CCarouselInner,
    CCarouselItem,
    CCarouselControl,

    } from '@coreui/react'
import whataspp from '../../assets/icons/whatsapp.svg'
import mercadoLogo from '../../assets/icons/mercado-libre-logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faFilePdf, faEye, faChevronCircleDown, faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const Card = ({ props, badge }) =>{

    const [ modal, setModal ] = useState(false)
    const { title, tags, ml, amazon, desc, urlfoto, urldata } = props
    
    const handledDownliadBtn = () => window.location.href=urldata[0]
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
    const whatsappMessage = `https://api.whatsapp.com/send/?phone=${phone}&text=Me gustaria tener información del producto: ${title}`
        

    return(
        <Fragment>

        <CCard className="card--container" id="#Card">

        <CCardHeader id="headingTwo">
            { badge && (<span className="badge--new">Nuevo</span>)}
            <div 
            block={true}
            color="link" 
            className="text-left m-0 p-0 d-flex div--button align-items-center justify-content-center" 
            onClick={toggleAccord}
            >
            {/* <div className="col-6 text-body d-flex flex-column"> */}
            <div className="card-display-grid">
                <p className="text--productos--title">
                    {title}
                </p>
                <div className="mt-1">
                <a href={whatsappMessage} target="_blank" rel="noreferrer">
                    <div className="btn btn-pill mr-2 mt-3 bg--whass">
                    <img src={whataspp} alt="contacto de whatsapp" />
                </div>
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
            </div>

        </CCardHeader>
        <CCollapse show={accordion === 1}>
            <CCardBody className="bg--hover">
            {/* <hr /> */}
            <div className="text-body text-center buy--now"><span>Disponible en:</span></div>
            <div className="mt-4">
                { !amazon ? null 
                : <CImg 
                    target="google.com" 
                    className="col-6 div--button" 
                    src='img/logo/amazon-2.svg' 
                    onClick={() => window.location.href=amazon} />}
                    
                { !ml ? 
                    null :
                    <a 
                        className="d-flex justify-content-center" 
                        href={`https://articulo.mercadolibre.com.mx/MLM-${ml.split("MLM")[1]}`}
                        target="_blank" 
                        rel="noreferrer">
                    <CImg className="col-6 div--button" src={mercadoLogo}/>
                    </a>
                }
            </div>
            <hr />
    
            <div className="btn-descrip bg--hover--more" onClick={toggleDesc}>
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

                
        {urldata[0] !== null && 
            (<button 
                    type="submit"
                    onClick={handledDownliadBtn}
                    className="btn btn-outline-danger mr-2" >
                    <FontAwesomeIcon className="mr-1" icon={faFilePdf}/>
                        Descarga la Ficha técnica
            </button>)
        }
                

                <button 
                    onClick={() => setModal(true)}
                    type="button" 
                    className="btn mr-2 btn-outline-dark" >
                    <FontAwesomeIcon className="mr-1" icon={faEye}/>
                        Galería
                </button>
            </div>
            </CCardBody>
        </CCollapse>
        </CCard>


        {/* // MODAL */}
        <CModal 
        show={modal} 
        onClose={setModal}
        >
        <CModalHeader closeButton>
            <CModalTitle></CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCarousel>
                <CCarouselInner>
                        { urlfoto.map(img => (
                        <CCarouselItem>
                            <img className="d-block w-100" src={img} alt="slide 1"/>
                        </CCarouselItem>
                        ))}
                    
                </CCarouselInner>
                        
                            <CCarouselControl direction="prev"><FontAwesomeIcon icon={faArrowCircleLeft} size="3x" /></CCarouselControl>
                            <CCarouselControl direction="next"><FontAwesomeIcon icon={faArrowCircleRight} size="3x" /></CCarouselControl>
                        
            </CCarousel>
        </CModalBody>
        {/* <CModalFooter>
            <CButton color="primary">Do Something</CButton>{' '}
            <CButton 
            color="secondary" 
            onClick={() => setModal(false)}
            >Cancel</CButton>
        </CModalFooter> */}
        </CModal>

    </Fragment>
    )
}

export default Card