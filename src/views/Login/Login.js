import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {

  const { register, handleSubmit } = useForm()

  const onLoginSubmit = (data) => {
      alert(JSON.stringify(data))
  }

  return (
    
      <div className="container-fluid" id="Login">                      

            <section className="container-form">

              <h3>Iniciar sesión</h3>
              <span className="text-welcome">Bienvendio a Grupo Intecsa</span>
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
              <smal className="mt-5">¿Se te olvido tu contraseña?</smal>
            </section>

      </div>

  )
}

export default Login
