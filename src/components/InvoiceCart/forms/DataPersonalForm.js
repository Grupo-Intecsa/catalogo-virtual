// import { useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'

import { useTiendaState, useTiendaDispatch } from 'context/TiendaContext'
import { useForm } from 'react-hook-form'

import app, { firebaseApp } from 'utils/base'
import { useCallback } from 'react'


const DataPersonalForm = ({ history }) => {

  const state = useTiendaState()
  const dispatch = useTiendaDispatch()

  console.log({ state, dispatch, history })

  const { register, handleSubmit, formState: { errors } } = useForm();

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

  const submitPersonaData = async (data) => {
    console.log(data)
  }
  
  return(
    <form onSubmit={handleSubmit(submitPersonaData)} className="formulario__carrito__data">
      <fieldset>
        <legend>Información Personal</legend>
          <label htmlFor="name">
              Nombre
              <input
                required={errors.name} 
                id="name"
                aria-invalid={errors.name ? "true" : "false"}
                type="text" 
                { ...register("name", { required: true })}
                />
          { errors.name && <span>Campo Obligatorio</span>}
          </label>
          <label htmlFor="email">
              Email
              <input
                required={errors.name} 
                id="email"
                type="email" 
                aria-invalid={errors.email ? "true" : "false"}
                { ...register("email", { required: true })}
                />
          { errors.email && <span>Campo Obligatorio</span>}
          </label>
          <label htmlFor="password">
              Contraseña
              <input
                required={errors.name} 
                valid
                id="password"
                type="password" 
                aria-invalid={errors.password ? "true" : "false"}
                { ...register("password", { required: true })}
                />
          { errors.password && <span>Campo Obligatorio</span>}
          </label>
      </fieldset>
      <div>
          <button type="submit">Nueva Cuenta</button>
          <button onClick={signUpGoogle} type="button">SignUp</button>
          <GoogleAuth />
      </div>
      <span>
      Recuerde su contraseña para su próximo pedido
      </span>
  </form>    
  )
}

export default withRouter(DataPersonalForm)