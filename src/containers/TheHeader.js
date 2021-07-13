import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import TheCanvasCart from './TheCanvasCart'
import SearchEngine from 'utils/SearchEngine'

import logo from '../assets/icons/path2.webp'
import { AppContext } from 'context/AppContext'

const TheHeader = () => {
  const { contactRequired } = useContext(AppContext)
  const { form, whatsapp } = contactRequired()

  const handleFormLik = () => {
    window.open(form, '_blank')
  }

  const handleWhatsapp = () => {
    window.open(whatsapp, '_blank')
  }

  return (
        <Fragment>
            
            <nav id="Navigation" className="bg-facebook">
                <section className="logo--input">
                  <Link to="/" onClick={() => document.body.scrollTop = 0}>
                      <img src={logo} className="iconSVG" alt="logo Empresa grupo intecsa"/>
                  </Link>
                  <SearchEngine />
                </section>

                {/* carrito y whatsapp */}
                <section className="whats--cart">
                  <span onClick={handleWhatsapp} className="ico--llamanos">55-24097656</span>
                  <TheCanvasCart />
                </section>              
            </nav>
              
              <div id="header--buttons" className="d-flex justify-content-center align-items-center">
                <Link to={{ pathname: "/" }} className="mr-2 d-block d-sm-none" ><span className="texto-navbar">Inicio</span></Link>
                <a onClick={handleFormLik} title="Ponte en contacto con nosotros para una cotizacion especializada" className="mr-2 btn-noStyle"><span className="texto-navbar">Contacto</span></a>
                <a href="http://grupointecsa.com" title="Quires saber mas de nostros y nuesto trabjo" rel="noreferrer" target="_blank" className="mr-2" ><span className="texto-navbar">¿Quiénes somos?</span></a>
                <a href="/#" title="¿Quieres una cotización?, contamos con la capacidad técnica y humana para desarrollar cualquier tipo de trabajo eléctrico." rel="nofollow" className="mr-2" ><span className="texto-navbar">Categorías</span></a>
              </div>
        </Fragment>
  )
}

export default TheHeader
