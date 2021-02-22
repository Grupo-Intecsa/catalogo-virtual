import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CButton, CForm, CImg, CInput } from '@coreui/react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'

import cosa from '../assets/icons/path2.png'


const TheHeader = () => {
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

  return (
            <Fragment>
            
            <nav id="Navigation" className="bg-linkedin col-12">
                <section>
                  <Link to="/">
                    <CImg src={cosa} className="iconSVG" height="60px"/>
                  </Link>
                </section>
                <section>
                <CForm className="form--header">
                    <CInput type="text" className="col-10" placeholder="Buscar productos, marcas y más"/>
                    <CButton type="submit" className="btn btn-danger"><FontAwesomeIcon icon={faSearch}/></CButton>
                  </CForm>
                </section>
                <section>
                  <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleSidebarMobile} className="d-lg-none m-1 div--button" />
                  <FontAwesomeIcon icon={faBars} size="2x" className="d-md-down-none m-1 div--button" onClick={toggleSidebar} />
                </section>
            </nav>

          
            {/* TODO boosgtrap para hacer lista un menu * aun sin funcion/}
            {/* <div className="bg-linkedin d-flex justify-content-center">
            
                <CLink className="mb-2 ml-3 nav-link custom--links d-none d-sm-block">
                    Crea tu cuenta
                </CLink>
                <CLink className="mb-2 ml-3 nav-link custom--links d-none d-sm-block">
                    Ingresa
                </CLink>
                <CLink className="mb-2 ml-3 nav-link custom--links d-none d-sm-block">
                    Mis Favoritos
                </CLink>

            </div> */}
        </Fragment>
  )
}

export default TheHeader
