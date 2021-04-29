import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CButton
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  const [ showComplete, setShowComplete ] = useState(true)
  const toogleView = () =>{
    setShowComplete(!showComplete)
  }

  return (
    <CSidebar
      className="bg-white"
      show={!show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
      onMinimizeChange={toogleView}
    >
      <CSidebarBrand className="d-md-down-none bg-gradient-dark" to="/">
          <h2 className="font-weight-bold text-white">Grupo Intecsa</h2>
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          src="img/logo/logo_completo.svg"
          
        />
      </CSidebarBrand>
        <div to="/" className="bg-gradient-info d-flex justify-content-center flex-column"> 
        <div className="c-avatar">
          <FontAwesomeIcon icon={faUserCircle} size="5x" />
        </div>
        {showComplete &&
          <div className="header-profile-text ml-3">
            {/* TODO: Agregar el nombre del usuario desde la BD */}
            <h1>Bienvenido</h1>
            <div className="w-100" />
            <p>Proximamente podrás crear una cuenta para ver tus pedidos, favoritos y más</p>
          </div>
        }
      <div className="d-flex justify-content-center mb-2">
      <CButton className="btn btn-light mr-2 mt-3">Ingresar</CButton>
      <CButton className="btn btn-outline-light mr-2 mt-3">Crear tu cuenta</CButton>
      </div>
      </div>

      <CSidebarNav className="mt-4">
        <CCreateElement
          
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      {/* <CSidebarMinimizer className="c-d-md-down-none"/> */}

    </CSidebar>
  )
}

export default React.memo(TheSidebar)
