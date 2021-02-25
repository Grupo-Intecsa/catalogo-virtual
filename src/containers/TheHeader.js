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
                    <CImg src={cosa} className="iconSVG" height="45px"/>
                  </Link>
                </section>
                <section>

                <div className="input-form-header">
                <form className="form--header">
                    <input type="text" placeholder="Buscar productos, marcas y más"/>
                    <CButton type="submit" className="btn btn-search"><FontAwesomeIcon icon={faSearch}/></CButton>
                  </form>
                </div>

                </section>
                <section>
                  <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleSidebarMobile} className="d-lg-none m-1 div--button" />
                  <FontAwesomeIcon icon={faBars} size="2x" className="d-md-down-none m-1 div--button" onClick={toggleSidebar} />
                </section>
            </nav>
        </Fragment>
  )
}

export default TheHeader
