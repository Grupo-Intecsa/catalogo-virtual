import React from 'react'
import { Link } from 'react-router-dom'

import whataspp from '../../assets/icons/whatsapp.svg'

const loading = (
    <span className="double-spinner"></span>
)

const Card = ({ props }) =>{

    const { title, tags, urlfoto, model, isKit, _id } = props

    const phone = "5215546371510"
    const whatsappMessage = `https://api.whatsapp.com/send/?phone=${phone}&text=Me gustaria tener información del producto: ${title}`

    const linkName = title.replace(/[^a-zA-Z 0-9]+/g,'').trim().split(" ").join("-").toLowerCase()
    const topView = document.getElementById('topMenuCard')

    return(
    <div  className={ isKit ? "neibor-card card__bg__familia" : "neibor-card card__bg" }>
        <div>
        <div className="img-neibor-card">
            <img src={urlfoto[0].toString()}  alt={tags} className="neibor-card-img" loading="lazy" onLoadStart={loading} />
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
                    <Link to={`/detalle/${_id}/${linkName}`} onClick={() => topView.scrollIntoView()}>
                    <button className="btn btn-nebor font-weight-bold">Ver detalle</button>
                    </Link>

                    <a href={whatsappMessage} target="_blank" rel="noreferrer"  className="btn btn-nebor-contacto">
                        Cotizar <img src={whataspp} alt="logo whatsapp" style={{ "width": "20px"}} className="ml-1"/>
                    </a>
                </div>
            </div>
        </div>
    
    </div>
    )
}

export default Card