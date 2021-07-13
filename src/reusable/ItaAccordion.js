import React, { useState } from 'react'

const ItaAccordion = ({ children, title, className }) => {

  const [ open, setOpen ] = useState(false)
  const handleOpen = () => setOpen(!open)

  const stylesOption = open ? null : "none"
  
  return (
    <div className={className}>
      
      <button 
        onClick={handleOpen} 
        className="handleiconAcordion"
      >
      <h4>{title}</h4>          
      </button>

      <div style={{ display: stylesOption }}>
        { children }
      </div>

    </div>
  )
}

export default ItaAccordion