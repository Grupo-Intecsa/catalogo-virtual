import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router'
import { UserState, UserDispatch } from 'context/userContext'



const Login = () => {

  const { state } = UserState()
  const dispatch = UserDispatch()
  
  const { register, handleSubmit } = useForm()

  const onLoginSubmit = (data) => {
      dispatch('LOGIN', { data })
  }

  return (
    
      <div id="Login"> 

            <div className="logo-login">
                <div className="d-flex align-content-center flex-column">
                  <p>Grupo Intecsa</p>
                  <span>Inicio de sesión de administración</span>
                </div>
            </div>

            <section className="container-form">

            <div className="form-login-content">

              <form onSubmit={handleSubmit(onLoginSubmit)}>

                <section className="control-input">
                  <label htmlFor="email" hidden aria-label="email"></label>
                  <input ref={register} type="email" name="email" id="email" placeholder="Correo Electronico"></input>
                </section>

                <section className="control-input">
                  <label htmlFor="password" hidden aria-label="password"></label>
                  
                  <input ref={register} type="password" name="password" id="password" placeholder="Contraseña"></input>
                </section>

                <section>
                  <button className="btn btn-login">Continuar</button>
                </section>
                {state.matches('error') ? <div className="login--err"><p className="mt-2 font-weight-bold">Error en el usuario o contraseña</p></div> : null }
                {state.matches('validate') ? <Redirect to="/admin"/> : null }
                {state.matches('success') ? <Redirect to="/admin"/> : null }

              </form>
            
            </div>

            </section>
      </div>

  )
}

export default Login
