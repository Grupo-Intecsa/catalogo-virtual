import React, { useState, forwardRef, useImperativeHandle } from 'react'

const AdminToggle = forwardRef(({ children }, ref) => {

  const [ visible, setVisible ] = useState(false)

  const hidenWenVisible = { display: visible ? "" : "none" };

  const toogleVisible = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      setVisible
    }
  })

  return(
    <div className="d-flex justify-content-center flex-column">
      
      <div style={hidenWenVisible}>
      <button className="ant-modal-close-x close" onClick={toogleVisible}>X</button> 
        { children } 
      </div>
      
    </div>
  )
})

export default AdminToggle