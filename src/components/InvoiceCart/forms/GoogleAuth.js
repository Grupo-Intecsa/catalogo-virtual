import { useCallback, useContext } from 'react'
import { AuthContext } from 'context/AuthContext'

import { withRouter } from 'react-router-dom'
import app, { firebaseApp } from 'utils/base'

const GoogleAuth = () => {

  const { currentUser } = useContext(AuthContext)
  
  const signUpGoogle = useCallback(async () => {
    const provider = new firebaseApp.auth.GoogleAuthProvider

    try {
      await app
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result)
        })
        
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      { !currentUser && <button className="google__ico" onClick={signUpGoogle}></button> }
    </>
  )
}

export default withRouter(GoogleAuth)
