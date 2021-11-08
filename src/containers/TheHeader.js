import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import TheCanvasCart from './TheCanvasCart'
import SearchEngine from 'utils/SearchEngine'
import DropMenuLeng from './DropMenuLeng'

import logo from '../assets/icons/path2.webp'
// import menu from '../assets/icons/bars.svg'
import { AppContext } from 'context/AppContext'

// login button
import LoginButton from 'components/LoginButton'


const TheHeader = () => {
  const { contactRequired, lenguage } = useContext(AppContext)
  const { form } = contactRequired()

  const handleFormLik = () => {
    window.open(form, '_blank')
  }

  

  return (
        <Fragment>
            
            <nav id="Navigation">
                <section className="logo--input">
                  <Link to="/" onClick={() => document.body.scrollTop = 0}>
                      <img src={logo} className="iconSVG" alt="logo Empresa grupo intecsa"/>
                  </Link>
                </section>

                <section className="menu--header">
                  <a onClick={handleFormLik} 
                    title="Ponte en contacto con nosotros para una cotizacion especializada">
                    {
                      lenguage === 'es' ? <span>Contacto</span> : <span>Contact</span>
                    }
                  </a>

                  <a 
                    href="http://grupointecsa.com" 
                    title="Quires saber mas de nostros y nuesto trabjo" 
                    rel="noreferrer" 
                    target="_blank">
                      {
                        lenguage === 'es' ? <span>Nosotros</span> : <span>About us</span>
                      }
                  </a>
                  {/* <a href="/#" 
                    title="¿Quieres una cotización?, contamos con la capacidad técnica y humana para desarrollar cualquier tipo de trabajo eléctrico." 
                    rel="nofollow">
                      <span>Categorías</span>
                  </a> */}
              </section>
                  
                {/* carrito y whatsapp */}
                <section className="tools__header__menu">
                  <DropMenuLeng />
                  <SearchEngine />
                  <LoginButton />
                  <TheCanvasCart />
                </section>
            </nav>


              <section className="menu--sm--header">
                  <a onClick={handleFormLik} 
                    title="Ponte en contacto con nosotros para una cotizacion especializada">
                    <span>Contacto</span>
                  </a>

                  <a 
                    href="http://grupointecsa.com" 
                    title="Quires saber mas de nostros y nuestro trabjo" 
                    rel="noreferrer" 
                    target="_blank">
                      <span>¿Quiénes somos?</span>
                  </a>

                  <a href="/#" 
                    title="¿Quieres una cotización?, contamos con la capacidad técnica y humana para desarrollar cualquier tipo de trabajo eléctrico." 
                    rel="nofollow">
                      <span>Categorías</span>
                  </a>
              </section>
              
        </Fragment>
  )
}

export default TheHeader
