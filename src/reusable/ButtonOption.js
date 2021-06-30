import React, { useState, useRef } from 'react'

const ButtonOption = ({ children, onClick }) => {

  const element = useRef()
  
  const handleButton = () => {    
    const activeButtons = document.getElementsByClassName("button--capacidad--selected")
    if(activeButtons.length > 0){
      activeButtons.forEach(div => div.classList.remove("button--capacidad--selected"))
    }

    if(children === element.current.value){
      element.current.classList.add("button--capacidad--selected")
    }
  }


  return (
    <div>
    <input id={children} type="button" ref={element} value={children} className="button--capacidad" onClick={handleButton}/>
    </div>
  )
}

export default ButtonOption