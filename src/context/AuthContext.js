import { createContext, useEffect, useState } from 'react'
import app from 'utils/base'


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser)
    }, [])

  return (
    <AuthContext.Provider value={{
      currentUser
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}