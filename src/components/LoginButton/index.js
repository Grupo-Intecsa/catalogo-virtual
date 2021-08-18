import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from 'context/AuthContext'

import app, { firebaseApp } from 'utils/base'
import loginUser from 'assets/icons/user.svg'

const LoginButton = () => {

  const [toggle, setToggle] = useState(false)

  const { currentUser } = useContext(AuthContext)
  const signOut = () => {
    app
      .auth()
      .signOut()
      .then(() => {
        
      })
  }

  const googleLogin = useCallback(async () => {
      const provider = new firebaseApp.auth.GoogleAuthProvider

      try {
        await app 
          .auth()
          .signInWithPopup(provider)
          .then(res => console.log(res))

      } catch (error) {
        console.log(error)
      }
  }, [])

  const refSubMenu = useRef()

  const toogleMenu = () => {
    if (refSubMenu.current.classList.contains("open__submenu")){
      refSubMenu.current.classList.remove("open__submenu")
    }else{
      refSubMenu.current.classList.add("open__submenu")
    }
  }

  useEffect(() => {
    const buttonLogin = document.querySelector("#buttonLogin")
    buttonLogin.addEventListener('click', () => {
      toogleMenu()
      setToggle(true)
    })

    if (toggle === true){
      window.addEventListener('click', function(e){
        if(!buttonLogin.contains(e.target) && refSubMenu.current.classList.contains("open__submenu")){
          toogleMenu()
          setToggle(false)
        }else {
          window.removeEventListener('click', this)
        }
      })    
    }

    return () => {
      setToggle(false)
      buttonLogin.removeEventListener('click', toogleMenu)
    }

  }, [toggle])

  return (
    <>
      <nav className="menu__login">
         <ul>
           <li>
               <img 
                  id="buttonLogin"
                  src={currentUser ? currentUser?.photoURL : loginUser } 
                  alt="inicio de sesion de usario para ver pedidos" 
                  title="Usa tu cuenta Google para hacer tu pedido"
                />
           </li>
           <li>
             <ul ref={refSubMenu} className="submenu__login">
               <li>
                 <div id="menu__black">
                 {
                   currentUser && 
                   <button onClick={signOut}>
                     Cerrar Sesion
                  </button>
                 }
                 {
                 !currentUser && 
                 <button onClick={googleLogin}>
                   Inciar Sesión
                 </button>
                 }
                 </div>
              </li>
               <li>
                 <button>
                   Mis pedidos
                 </button>
              </li>

             </ul>
           </li>
         </ul>
      </nav>
    </>
  )
}


export default LoginButton
