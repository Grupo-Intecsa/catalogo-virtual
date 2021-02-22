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
            
            <div className="col-12 productos--search d-flex justify-content-center bg-linkedin m-0">
            <Link to="/">
            <CImg src={cosa} className="iconSVG" height="40px"/>
            </Link>
            
            <div className="col-12 col-sm-8 d-flex">
            <CForm className="col-12">
            <div className="input-group mb-3">
              <CInput type="text" className="form-control" placeholder="Buscar productos, marcas y más" aria-label="buscar productos" aria-describedby="basiaddon2" />
              <div className="input-group-append">
                <CButton type="submit" className="input-group-text"><FontAwesomeIcon icon={faSearch}/></CButton>
              </div>
            </div>
            {/* <CInput className="col-12 col-sm-10 custom--heigt" placeholder="Buscar productos, marcas y"></CInput> */}
            </CForm>
            </div>

            <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleSidebarMobile} className="d-lg-none m-1 div--button" />
            <FontAwesomeIcon icon={faBars} size="2x" className="d-md-down-none m-1 div--button" onClick={toggleSidebar} />
          
            </div>
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
