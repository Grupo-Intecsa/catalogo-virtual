import React, { Fragment, useState } from 'react'

import whataspp from '../../assets/icons/whatsapp.svg'
import mercadoLogo from '../../assets/icons/mercado-libre-logo.svg'

import { Modal } from 'antd';
import EmblaModal from '../../components/EmblaCarousel/EmblaModal'

const ModalCapacidades = ({ isSelect, toogleModalCap }) => {

    return (
        <div>
            <Modal
            wrapClassName="supermodal" 
            title="Selecciona la capacidad que necesitas" 
            visible={isSelect} 
            onCancel={toogleModalCap} width={500}
            >
                <h1>Capacidades</h1>
                <label className="label">Amperaje</label>
                <select className="form-select form-select-lg mb-3">
                    <option>1 AMP</option>
                    <option>1 AMP</option>
                    <option>1 AMP</option>
                    <option>1 AMP</option>
                </select>
            </Modal>
        </div>
    )
}


const ModalDetalle = ({ isModal, toogle, data }) => {

    
    const [ isSelect, setIsSelect ] = useState(false)
    const toogleModalCap = () => setIsSelect(!isSelect)

    const { title, ml, desc, urlfoto, urldata, model, isKit, compatible, familia } = data

    

    return (
    <Fragment>
    
    <ModalCapacidades isSelect={isSelect} toogleModalCap={toogleModalCap} />

    <Modal 
        wrapClassName="supermodal" 
        title="¿Tienes dudas? ¡Llámanos y te apoyamos! +52 55 5570-1197" 
        visible={isModal} 
        onCancel={toogle} width={1000}>

        <div className="modal--productos">
            <div className="modal-carousel">
                {/* carouse */}
                {/* <img src={urlfoto[0]} className="img-fluid" alt={title} loading="eager" /> */}
                <EmblaModal urlfoto={urlfoto} />
            </div>

            <div className="modal-datos">
                {/* titulo */}
                <div>
                    <h2 className="texto-title-neibor">{title}</h2>
                </div> 
                {/* modelo y disponibilidad */}
                <div className="modal--dispose">
                    <span className="font-weight-bold mt-2 font-xl dispose-item text-center">
                        Disponible
                    </span>
                    
                    <span className="mt-2 text-black-50">
                        Código: <p className="font-weight-bold mb-4">{model}</p>
                    </span>

                    { isKit &&
                        <span className="mt-2 text-black-50">
                            Familia:  <p className="font-weight-bold mb-4">{familia}</p>
                        </span>
                    }
                </div>
                        
                {/* descripcion */}
                <div className="modal-desc">
                    <span className="text-justify">{desc}</span>
                </div>
                {/*  bontonera */}
                <div className="modal-botonera">
                    <a href="#" target="_blank" rel="noreferrer" className="btn btn-modal-contacto">
                            Contactar <img src={whataspp} alt="logo whatsapp" style={{ "width": "20px"}} className="ml-1"/>
                    </a>
                </div>
                <div>
                    
                </div>
                <div>
                    {/*  comprar */}
                    
                </div>
                <div className="modal-aviso">
                    {/* donde comprar */}
                    <div>                    
                    { ml === "null"
                        ? ( 
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
                        : (
                            <div>
                                <p>Puedes adquirir nuestros productos en:</p>
                                <a href={ ml === null ? '#' : `https://articulo.mercadolibre.com.mx/MLM-${ml?.split("MLM")[1]}`} target="_blank" rel="noreferrer">
                                    <img src={mercadoLogo} alt={title} className="btn-ecommerce" />
                                </a>
                            </div>
                                )
                    }
                                                
                    </div>
                </div>
                <hr/>
                <div className="modal-ficha">
                    {/* donde comprar */}
                    <a href={urldata[0]} target="_blank" rel="noreferrer" className="btn btn-modal-pdf">
                            Ficha Técnica
                    </a>

                { isKit &&
                    <button  className="btn btn-facebook" onClick={toogleModalCap}>
                            Buscar Capacidad
                    </button>
                }
                </div>
            </div>
        </div>
    </Modal>
    </Fragment>
        
    )
}

const Card = ({ props, badge }) =>{

    const [ isModal, setIsModal ] = useState(false)
    const { title, tags, urlfoto, model, isKit } = props
    
    const toogle = () => setIsModal(!isModal)

    const phone = "5215546371510"
    const whatsappMessage = `https://api.whatsapp.com/send/?phone=${phone}&text=Me gustaria tener información del producto: ${title}`
    
    return(
    <div  className={ isKit ? "neibor-card card__bg__familia" : "neibor-card card__bg" }>
        <div>
        <div className="img-neibor-card">
            <img src={urlfoto[0].toString()}  alt={tags} className="neibor-card-img" loading="lazy" />
        </div>
        </div>
        <div className="title-neibor-card">
            <div>
                <div className="datos-card-neibor">
                    <h1 className="texto-title-neibor">{title}</h1>

                    <span className="font-weight-bold mt-2 font-xl">
                        Disponible
                    </span>
                    
                    <span className="mt-2 text-black-50">
                        Código: <p className="font-weight-bold mb-4 text-uppercase">{model}</p>
                    </span>
                </div>
                
                <div className="contenido-neibor-card">
                    <button className="btn btn-nebor font-weight-bold" onClick={() => toogle()} >Ver detalle</button>
                    
                    <a href={whatsappMessage} target="_blank" rel="noreferrer"  className="btn btn-nebor-contacto">
                        Contactar <img src={whataspp} alt="logo whatsapp" style={{ "width": "20px"}} className="ml-1"/>
                    </a>
                </div>
            </div>
        </div>
        
        <ModalDetalle toogle={toogle} isModal={isModal} data={props}/>

        </div>
    )
}

export default Card