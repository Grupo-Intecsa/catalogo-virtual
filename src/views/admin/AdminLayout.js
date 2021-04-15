import React, { useEffect, useRef } from 'react'

import {  
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import { UserState, UserDispatch } from 'context/userContext'
import { Redirect } from 'react-router'

import AdminToggle from './AdminToggle'

const MenuTareas = React.lazy(() => import('./content'))
const ProductoFrom = React.lazy(() => import('components/uploadForm/ProductoForm'))
const UpdateProducts  = React.lazy(() => import('components/uploadForm/UpdateProducts'))


const Public = () => {
  return (<Redirect to="/"></Redirect>)
}

const AdminLayout = (props) => {

  const { state } = UserState()
  const dispatch = UserDispatch()

  const nuevoRef = useRef()
  const updateRef = useRef()

  const { name, _id } = state.context?.user?.data
  // useEffect(() =>{
  //   const sub = service.subscribe((state) => console.log(state))
  //   return () => sub.unsubscribe()
  // },[state])

  return(
    <div className="admin--layout">
      <nav className="navbar--layout">
        <span>Panel de Administración</span>
        <div>
        <div>
      <CDropdown className="mt-2">
        <CDropdownToggle caret>
        <FontAwesomeIcon size="4x" style={{ "color": "whitesmoke" }} icon={faUserCircle} />
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem header>{name}</CDropdownItem>
          <CDropdownItem divider /> 
          <CDropdownItem onClick={() => dispatch('LOGOUT')}>Salir</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
        </div>
      </nav>
      {/* AdminNavbar */}
      <div className="grid-menu-content">
        {/* aqui va el menu de admin */}
        <MenuTareas nuevoRef={nuevoRef} updateRef={updateRef}  />
      </div>
      <div className="admin--tool">
      
      {/* por ahora aqui se renderea el menu */}
      {/* componente de formulario de productos */}

      <AdminToggle ref={nuevoRef} modulname={"Añadir Producto"} >
        <ProductoFrom {...props} />       
      </AdminToggle>
      
      <AdminToggle ref={updateRef} modulname={"Actualizar Producto"} >
        <UpdateProducts {...props} userId={_id} />       
      </AdminToggle>

      {state.matches('error') ? <Redirect to="/login" /> : null }
      </div>
    </div>
  )
}

const Validate = () => {
  const dispatch = UserDispatch()
  const { state } = UserState()

  // useEffect(() => {
  //   const sub = service.subscribe(state => console.log(state))
  //   return () => sub.unsubscribe()
  // },[state])

  useEffect(() => {
    dispatch('VALIDATE')
  },[])

  return (
    <>
      {state.matches('validate') && <span>protegiendo ruta</span>}
      {state.matches('success') && <AdminLayout /> }
      {state.matches('error') && <Public />}
      {state.matches('initial') && <Redirect to="/login"></Redirect>}
    </>
  )
}

export default Validate