import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from 'context/AuthContext'

const PrivateAuthRoute = ({ componente: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) => {
        !currentUser 
        ? (
          <RouteComponent {...props }/>
        )
        : (
          <Redirect to={"/"} />
        )
      }}

    >
    </Route>
  ) 

}

export default PrivateAuthRoute