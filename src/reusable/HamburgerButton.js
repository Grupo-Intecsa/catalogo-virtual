import { useState } from "react"

const HamburgerButton = ({ children }) => {

  const [ openHamburger, setOpenHAmburger ] = useState(true)
  const toggleHaburger = () => setOpenHAmburger(!openHamburger)

  return(
    <>
      <span 
        id='hamburgerBtn' 
        onClick={toggleHaburger}
        className={ openHamburger ? 'hamburger_btn' : 'hamburger_btn hamburger_btn_open'}>
        <div />
        <div />
        <div />
    </span>
    <div hidden={openHamburger} className="menu__hiden__hamburger">
      { children }
    </div>
  </>
  )
}

export default HamburgerButton