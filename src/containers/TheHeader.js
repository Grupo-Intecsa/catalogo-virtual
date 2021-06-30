import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CButton } from '@coreui/react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import TheCanvasCart from './TheCanvasCart'

import logo from '../assets/icons/path2.webp'

import FormContact from 'views/FormContact'


const TheHeader = ({ busqueda }) => {

  const [ visible, setVisible ] = useState(false)
  const visibleToggle = () => setVisible(!visible)

  const location = useLocation()
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const [ queryText, setQueryText ] = useState(undefined)
  const [ search, setSearch ] = useState(false)

  useEffect(() => {

    if( location.pathname !== '/dashboard'){
      setSearch(false)
    }
  },[location.pathname])
  
  const handleSubmit = (e) => {
    e.preventDefault()        
    setSearch(true)
    document.body.scrollTop = 10
    
  }

  return (
        <Fragment>
            
            <nav id="Navigation" className="c-header px-3 bg-facebook">
                <section>
                <Link to="/" onClick={() => document.body.scrollTop = 0}>
                    <img src={logo} className="iconSVG d-none d-sm-block" alt="logo Empresa grupo intecsa" />
                </Link>
                {/* <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleSidebarMobile} className="d-lg-none m-1 div--button" />
                  <FontAwesomeIcon icon={faBars} size="2x" className="d-md-down-none m-1 div--button" onClick={toggleSidebar} /> */}
                </section>

                <section>

                <div className="input-form-header">
                <form className="form--header" onSubmit={handleSubmit} >
                    <input type="text" placeholder="Buscar productos, marcas y más"  value={queryText} onChange={(e) => setQueryText(e.target.value)}>
                      </input>
                    
                    <CButton type="submit" className="btn btn-search"><FontAwesomeIcon icon={faSearch}/></CButton>
                  </form>
                </div>
                </section>
                
                <section>
                  <TheCanvasCart />
                </section>
                
            </nav>
              <div id="header--buttons" className="d-flex justify-content-center align-items-center">
                <Link to={{ pathname: "/" }} className="mr-2 d-block d-sm-none" ><span className="texto-navbar">Inicio</span></Link>
                <button onClick={visibleToggle} title="Ponte en contacto con nosotros para una cotizacion especializada" className="mr-2 btn-noStyle"><span className="texto-navbar">Contacto</span></button>
                <FormContact visible={visible} contactoToggle={visibleToggle} placeholder={"Déjanos tus datos para poder iniciar WhatsApp"} />

                <a href="http://grupointecsa.com" title="Quires saber mas de nostros y nuesto trabjo" rel="noreferrer" target="_blank" className="mr-2" ><span className="texto-navbar">¿Quiénes somos?</span></a>
                
                <a href="/#" title="¿Quieres una cotización?, contamos con la capacidad técnica y humana para desarrollar cualquier tipo de trabajo eléctrico." rel="nofollow" className="mr-2" ><span className="texto-navbar">Categorías</span></a>
              </div>
            
            { search && <Redirect to={`/product/text/${queryText}`} />}
        </Fragment>
  )
}

export default TheHeader
