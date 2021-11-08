import { useTiendaDispatch } from 'context/TiendaContext'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
// componente principal de envio
//TODO crear modelo para guardar los datos del invoice 
const DireccionEnvio = () => {

  const dispatch = useTiendaDispatch()
  
  const  { register, handleSubmit, formState: { errors }} = useForm()

  const onSubmitDirectionData = (data) => {
    dispatch('FORM_STEPS', { data })
  }

  const [cheked, setCheked] = useState(true)
  const toogleSameDirectory = () =>{
    setCheked(!cheked)
  }

  return(
    <form onSubmit={handleSubmit(onSubmitDirectionData)} className="formulario__carrito__data">
    <fieldset>
      <div>
      <label htmlFor="razonsocial">
            Razón Social
        </label>
        <input 
          aria-invalid={errors.razonsocial ? "true" : "false" }
          id="razonsocial"
          required={errors.razonsocial}
          placeholder={errors.razonsocial && "Obligatorio"}
          type="text" 
          { ...register("razonsocial", { required: true })}
          />
      </div>

      <div>
        <label htmlFor="rfc">
            RFC
        </label>
            <input 
              aria-invalid={errors.rfc ? "true" : "false" }
              required={errors.rfc}
              placeholder={errors.rfc && "Ingresa un RFC valido"}
              id="rfc"
              type="text" 
              { ...register("rfc", { 
                pattern: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/
               })}
              />
      </div>

      <div>
        <label htmlFor="direccionRfc">
            Dirección
        </label>
            <input 
              aria-invalid={errors.direccionRfc ? "true" : "false" }
              required={errors.direccionRfc}
              placeholder={errors.direccionRfc && "Obligatorio"}
              id="direccionRfc"
              type="text" 
              { ...register("direccionRfc", { required: true })}
              />
        </div>

        <div>
        <label htmlFor="coloniaRfc">
            Colonia
        </label>
            <input
              aria-invalid={errors.coloniaRfc ? "true" : "false" }
              required={errors.coloniaRfc}
              placeholder={errors.coloniaRfc && "Obligatorio"}
              id="coloniaRfc"
              type="text" 
              { ...register("coloniaRfc", { required: true })}
              />
        </div>

        <div>
        <label htmlFor="codigopostalRcf">
            Código Postal
        </label>
            <input 
              aria-invalid={errors.codigopostalRcf ? "true" : "false" }
              required={errors.codigopostalRcf}
              placeholder={errors.codigopostalRcf && "Obligatorio"}
              id="codigopostalRcf"
              type="text" 
              { ...register("codigopostalRcf", { required: true })}
              />
          </div>

        <div>  
        <label htmlFor="ciudadRfc">
            Ciudad
        </label>
            <input 
              aria-invalid={errors.ciudadRfc ? "true" : "false" }
              required={errors.ciudadRfc}
              placeholder={errors.ciudadRfc && "Obligatorio"}
              id="ciudadRfc"
              type="text" 
              { ...register("ciudadRfc", { required: true })}
              />
        </div>

        <div>
        <label htmlFor="estadoRfc">
            Estado
        </label>
            <input 
              aria-invalid={errors.estadoRfc ? "true" : "false" }
              required={errors.estadoRfc}
              placeholder={errors.estadoRfc && "Obligatorio"}
              id="estadoRfc"
              type="text" 
              { ...register("estadoRfc", { required: true })}
              />
        </div>

        <div>
        <label htmlFor="alcaldiaRfc">
            Provincia o Alcaldia
        </label>
            <input 
              aria-invalid={errors.alcaldiaRfc ? "true" : "false" }
              required={errors.alcaldiaRfc}
              placeholder={errors.alcaldiaRfc && "Obligatorio"}
              id="alcaldiaRfc"
              type="text" 
              { ...register("alcaldiaRfc", { required: true })}
              />
        </div>

        <div>
        <label htmlFor="phone">
            Teléfono
        </label>
            <input 
              aria-invalid={errors.phone ? "true" : "false" }
              required={errors.phone}
              placeholder={errors.phone && "Escribe un número a 10 digitos"}
              id="phone"
              type="text" 
              { ...register("phone", 
              { 
                required: true,
                pattern: /(\(\d{3}\)[.-]?|\d{3}[.-]?)?\d{3}[.-]?\d{4}/
  
               }
              )}
              />
        </div>
    </fieldset>
    <div className="checkbox__input">
        <label>
          La dirección de Envio es la mima dirección que facturación
        </label>
        <input
        type="checkbox"
        id="sameAddress"
        checked={cheked}
        onClick={() => toogleSameDirectory()}
        { ...register("sameAddress")}
        >
        </input>
    </div>
    {
      !cheked && (
      <fieldset id="direccion_factura">
        <legend>Dirección de Envio</legend>
      
      <div>
        <label htmlFor="direccionEnvio">
            Dirección
        </label>
        <input 
              aria-invalid={errors.direccionEnvio ? "true" : "false" }
              required={errors.direccionEnvio}
              placeholder={errors.direccionEnvio && "Obligatorio"}
              id="direccionEnvio"
              type="text" 
              { ...register("direccionEnvio", { required: false })}
              />
      </div>

      <div>
        <label htmlFor="coliniaEnvio">
            Colonia
        </label>
            
            <input 
              aria-invalid={errors.coliniaEnvio ? "true" : "false" }
              required={errors.coliniaEnvio}
              placeholder={errors.coliniaEnvio && "Obligatorio"}
              id="coliniaEnvio"
              type="text" 
              { ...register("coliniaEnvio", { required: false })}
              />
      </div>

      <div>
        <label htmlFor="postalEnvio">
            Código Postal
        </label>
            <input 
              aria-invalid={errors.postalEnvio ? "true" : "false" }
              required={errors.postalEnvio}
              placeholder={errors.postalEnvio && "Obligatorio"}
              id="postalEnvio"
              type="text" 
              { ...register("postalEnvio", { required: false })}
              />
      </div>

      <div>
        <label htmlFor="ciudadEnvio">
            Ciudad
        </label>
            <input 
              aria-invalid={errors.ciudadEnvio ? "true" : "false" }
              required={errors.ciudadEnvio}
              placeholder={errors.ciudadEnvio && "Obligatorio"}
              id="ciudadEnvio"
              type="text" 
              { ...register("ciudadEnvio", { required: false })}
              />
      </div>

      <div>
        <label htmlFor="estadoEnvio">
            Estado
        </label>
            <input 
              aria-invalid={errors.estadoEnvio ? "true" : "false" }
              required={errors.estadoEnvio}
              placeholder={errors.estadoEnvio && "Obligatorio"}
              id="estadoEnvio"
              type="text" 
              { ...register("estadoEnvio", { required: false })}
              />
      </div>

      <div>
        <label htmlFor="alcaldiaEnvio">
            Provincia o Alcaldia
        </label>  
            <input 
              aria-invalid={errors.alcaldiaEnvio ? "true" : "false" }
              required={errors.alcaldiaEnvio}
              placeholder={errors.alcaldiaEnvio && "Obligatorio"}
              id="alcaldiaEnvio"
              type="text" 
              { ...register("alcaldiaEnvio", { required: false })}
              />
      </div>
      </fieldset>
      )
    }
    <button type="submit">Siguiente</button>
    </form>
  )
}

export default DireccionEnvio