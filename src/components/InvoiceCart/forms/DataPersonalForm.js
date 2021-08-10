import { useTiendaState, useTiendaDispatch } from 'context/TiendaContext'
import { useForm } from 'react-hook-form'


const DataPersonalForm = () => {

  const state = useTiendaState()
  const dispatch = useTiendaDispatch()
  console.log({ state, dispatch })

  const { register, handleSubmit, formState: { errors } } = useForm();
  const submitPersonaData = (data) => {
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
          <button type="button">Ingrese su Cuenta</button>
      </div>
      <span>
      Recuerde su contraseña para su próximo pedido
      </span>
  </form>    
  )
}

export default DataPersonalForm