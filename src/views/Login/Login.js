import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router'
import { UserState, UserDispatch } from '../../context/userContext'

const Login = () => {

  const { state, service } = UserState()
  const dispatch = UserDispatch()

  console.log(state, service)

  useEffect(() => {
    const sub = service.subscribe((state) => console.log(state) )
    return () => sub.unsubscribe()
  },[state]) 

  const { register, handleSubmit } = useForm()

  const onLoginSubmit = (data) => {
      dispatch('LOGIN', { data })
  }

  return (
    
      <div className="container-fluid" id="Login">                      

            <section className="container-form">

              <h3>Iniciar sesión</h3>
              <span className="text-welcome">Bienvendio a Grupo Intecsa</span>

              {state.matches('error') ? <div className="bg-danger w-75 text-center rounded"><p className="mt-2 font-weight-bold">Error en el usuario o contraseña</p></div> : null }
              {state.matches('validate') ? <Redirect to="/admin"/> : null }
              {state.matches('success') ? <Redirect to="/admin"/> : null }

              <hr className="card-accent-primary" />
              
              <form onSubmit={handleSubmit(onLoginSubmit)}>

                <section className="control-input">
                  <label htmlFor="email"><strong>Correo Electrónico</strong></label>
                  <input ref={register} type="email" name="email" id="email"></input>
                </section>

                <section className="control-input">
                  <label htmlFor="password"><strong>Contraseña</strong></label>
                  
                  <input ref={register} type="password" name="password" id="password"></input>
                </section>

                <section>
                  <button className="btn btn-success login">Continuar</button>
                </section>
              </form>
              <span className="mt-5 font-weight-bold">¿Se te olvido tu contraseña?</span>
            </section>
            

      </div>

  )
}

export default Login
