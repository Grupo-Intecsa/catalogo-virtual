import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import FormContact from 'views/FormContact'
import whataspp from '../../assets/icons/whatsapp.svg'

// const loading = (
//     <span className="double-spinner"></span>
// )

const Card = ({ props }) =>{

    const location = useLocation()
    
    const [ cotizar, setCotizar ] = useState(false)
    const contactoToggle = () => setCotizar(!cotizar)

    const { title, tags, urlfoto, model, isKit, _id } = props

    const linkName = title.replace(/[^a-zA-Z 0-9]+/g,'').trim().split(" ").join("-").toLowerCase()
    const topView = document.getElementById('topMenuCard')

    return(
        <div className="card__bg">
        <div className={ isKit ? "neibor-card card__bg__familia " : "neibor-card" }>
        
        <div>
        <div className="img-neibor-card">
            <img src={urlfoto[0].toString()}  alt={tags} className="neibor-card-img" loading="lazy"/>
        </div>
        </div>
        <div className="title-neibor-card">
            <div>
                <div className="datos-card-neibor">
                    <h1 className="texto-title-neibor text-uppercase">{title}</h1>
                        {/* TODO verificar si esta disponible */}
                    {/* <span className="font-weight-bold mt-2 font-xl">
                        Disponible
                    </span> */}
                    
                    <span className="mt-2 text-black-50">
                        Código: <p className="font-weight-bold mb-4 text-uppercase">{model}</p>
                    </span>
                </div>
                
                <div className="contenido-neibor-card">

                        <Link to={{
                            pathname: `/detalle/${_id}/${linkName}`,
                            state: { from: location.pathname }
                        }} 
                        onClick={() => topView.scrollIntoView()}
                            >
                            <button className="btn btn-nebor font-weight-bold">
                                Ver detalle
                            </button>
                        </Link>
                    
                    <button className="btn btn-nebor-contacto" onClick={contactoToggle}>
                        Cotizar <img src={whataspp} alt="logo whatsapp" style={{ "width": "20px"}} className="ml-1"/>
                    </button>
                    <FormContact visible={cotizar} contactoToggle={contactoToggle} title={title} />
                </div>
            </div>
        </div>
        </div>
        </div>
    
    )
}

export default Card