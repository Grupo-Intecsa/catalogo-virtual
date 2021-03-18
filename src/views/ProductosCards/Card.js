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
import contactoLogo from '../../assets/icons/contacto.png'


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faShoppingCart, faFilePdf, faEye, faChevronCircleDown, faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const ModalDetalle = ({ isModal, toogle, data }) => {

    const { title, tags, ml, amazon, desc, urlfoto, urldata, model } = data


    return (

        <CModal show={isModal} className="modal-dialog-centered" >
        <div className="modal--productos">
            <div className="modal-carousel">
                {/* carouse */}
                <img src={urlfoto[0]} className="img-fluid" alt={title} />
            </div>
            <div className="modal-datos">
                <h1>{title}</h1>
                <span>{model}</span>
                <button>Contacto</button>
                <div>
                    {/* donde comprar */}
                    <img src={mercadoLogo} className="img-fluid" alt={title} />
                </div>
            </div>
        </div>
        </CModal>
    )
}

const Card = ({ props, badge }) =>{

    const [ isModal, setIsModal ] = useState(false)
    const { title, tags, ml, amazon, desc, urlfoto, urldata, model } = props
    
    const [ imgOnload, setImgeOnload ] = useState(true)

    const toogle = () => setIsModal(!isModal)

    const phone = "5215546371510"
    const whatsappMessage = `https://api.whatsapp.com/send/?phone=${phone}&text=Me gustaria tener información del producto: ${title}`
        

    return(
        <div>
        <div className="neibor-card">
            <div className="img-neibor-card">
                <div className={ imgOnload ? "double-spinner" : "hiden" }></div> 
                <img onLoad={() => setImgeOnload(false)} src={urlfoto[0]}  alt={tags} className="neibor-card-img" loading="lazy" />
            </div>
            <div className="title-neibor-card">
                <div className="datos-card-neibor">
                    <h1 className="texto-title-neibor">{title}</h1>

                    <span className="font-weight-bold mt-2 font-xl">
                        Disponible
                    </span>
                    
                    <span className="mt-2 text-black-50">
                        Código: <p className="font-weight-bold mb-4">{model}</p>
                    </span>
                </div>
                
                <div className="contenido-neibor-card">
                    <button className="btn btn-nebor font-weight-bold" onClick={() => toogle()} >Ver detalle</button>
                    <a href={whatsappMessage} target="_blank" rel="noreferrer"  className="btn btn-nebor-contacto font-weight-bold">
                        Contactar <img src={whataspp} alt="logo whatsapp" className="ml-1"/>
                    </a>
                </div>
            </div>

        </div>
        
        {/* <ModalDetalle isModal={isModal} toogle={toogle} data={props} /> */}
        </div>
    )
}

export default Card