import React from 'react'
// import { Link } from 'react-router-dom'

const MenuTareas = ({ nuevoRef, updateRef }) => {
  
  const handleNuevoButton = () => {
    nuevoRef.current.setVisible(true)
    updateRef.current.setVisible(false)
  }
  
  const handleUpdateButton = () => {
    updateRef.current.setVisible(true)
    nuevoRef.current.setVisible(false)
  }
  
  return(
    <div className="grid">
      
      <div className="card-admin-menu" onClick={handleNuevoButton}>
          <span className="text-center">Añadir<br/> Producto</span>
      </div>
      

      <div className="card-admin-menu" onClick={handleUpdateButton}>
          <span className="text-center">Actualizar<br /> Prodcuto</span>
      </div>
      {/* <div className="card-admin-menu">
          <span className="text-center">Próximamente</span>
      </div>
      <div className="card-admin-menu">
          <span className="text-center">Próximamente</span>
      </div> */}
    </div>
  )
}


export default MenuTareas