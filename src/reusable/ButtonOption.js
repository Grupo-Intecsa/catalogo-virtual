import { useContext, useRef } from 'react'
import { AppContext } from 'context/AppContext'


const ButtonOption = ({ children, isSelected }) => {

  const element = useRef()
  const { setFamBarItemSelected } =useContext(AppContext)

  const handleButton = (e) => {  

    const slectedOption = (event) => {

      const array = event.target.value.split(" ")
      setFamBarItemSelected({ cap: array[0], unidad: array[1] })
    }
    slectedOption(e)
    
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
      <input 
        id={children} 
        type="button" 
        ref={element} 
        value={children} 
        className={isSelected ? "button--capacidad--selected" : "button--capacidad"} 
        onClick={handleButton}/>
    </div>
  )
}

export default ButtonOption