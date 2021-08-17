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
              required={errors.razonsocial}
              placeholder={errors.razonsocial && "Ingresa un RFC valido"}
              id="rfc"
              type="text" 
              { ...register("rfc", { 
                pattern: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/
               })}
              />
      </div>

      <div>
        <label htmlFor="direccion">
            Dirección
        </label>
            <input 
              aria-invalid={errors.direccion ? "true" : "false" }
              required={errors.direccion}
              placeholder={errors.direccion && "Obligatorio"}
              id="direccion"
              type="text" 
              { ...register("direccion", { required: true })}
              />
        </div>

        <div>
        <label htmlFor="colonia">
            Colonia
        </label>
            <input
              aria-invalid={errors.colonia ? "true" : "false" }
              required={errors.colonia}
              placeholder={errors.colonia && "Obligatorio"}
              id="colonia"
              type="text" 
              { ...register("colonia", { required: true })}
              />
        </div>

        <div>
        <label htmlFor="codigopostal">
            Código Postal
        </label>
            <input 
              aria-invalid={errors.codigopostal ? "true" : "false" }
              required={errors.codigopostal}
              placeholder={errors.codigopostal && "Obligatorio"}
              id="codigopostal"
              type="text" 
              { ...register("codigopostal", { required: true })}
              />
          </div>

        <div>  
        <label htmlFor="ciudad">
            Ciudad
        </label>
            <input 
              aria-invalid={errors.ciudad ? "true" : "false" }
              required={errors.ciudad}
              placeholder={errors.ciudad && "Obligatorio"}
              id="ciudad"
              type="text" 
              { ...register("ciudad", { required: true })}
              />
        </div>

        <div>
        <label htmlFor="estado">
            Estado
        </label>
            <input 
              aria-invalid={errors.estado ? "true" : "false" }
              required={errors.estado}
              placeholder={errors.estado && "Obligatorio"}
              id="estado"
              type="text" 
              { ...register("estado", { required: true })}
              />
        </div>

        <div>
        <label htmlFor="provinciaedo">
            Provincia o Estado
        </label>
            <input 
              aria-invalid={errors.estado ? "true" : "false" }
              required={errors.estado}
              placeholder={errors.estado && "Obligatorio"}
              id="provinciaedo"
              type="text" 
              { ...register("provinciaedo", { required: true })}
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
        <legend>Dirección de Facturación</legend>
      
      <div>
        <label htmlFor="direccion_factura">
            Dirección
        </label>
        <input 
              aria-invalid={errors.direccion_factura ? "true" : "false" }
              required={errors.direccion_factura}
              placeholder={errors.direccion_factura && "Obligatorio"}
              id="direccion_factura"
              type="text" 
              { ...register("direccion_factura", { required: false })}
              />
      </div>

      <div>
        <label htmlFor="colonia_factura">
            Colonia
        </label>
            
            <input 
              aria-invalid={errors.colonia_factura ? "true" : "false" }
              required={errors.colonia_factura}
              placeholder={errors.colonia_factura && "Obligatorio"}
              id="colonia_factura"
              type="text" 
              { ...register("colonia_factura", { required: false })}
              />
      </div>

      <div>
        <label htmlFor="codigopostal__factura">
            Código Postal
        </label>
            <input 
              aria-invalid={errors.codigopostal__factura ? "true" : "false" }
              required={errors.codigopostal__factura}
              placeholder={errors.codigopostal__factura && "Obligatorio"}
              id="codigopostal__factura"
              type="text" 
              { ...register("codigopostal__factura", { required: false })}
              />
      </div>

      <div>
        <label htmlFor="ciudad__factura">
            Ciudad
        </label>
            <input 
              aria-invalid={errors.ciudad__factura ? "true" : "false" }
              required={errors.ciudad__factura}
              placeholder={errors.ciudad__factura && "Obligatorio"}
              id="ciudad__factura"
              type="text" 
              { ...register("ciudad__factura", { required: false })}
              />
      </div>

      <div>
        <label htmlFor="estado__facturacion">
            Estado
        </label>
            <input 
              aria-invalid={errors.estado__facturacion ? "true" : "false" }
              required={errors.estado__facturacion}
              placeholder={errors.estado__facturacion && "Obligatorio"}
              id="estado__facturacion"
              type="text" 
              { ...register("estado__facturacion", { required: false })}
              />
      </div>

      <div>
        <label htmlFor="provinciaedo__facturacion">
            Provincia o Estado
        </label>  
            <input 
              aria-invalid={errors.provinciaedo__facturacion ? "true" : "false" }
              required={errors.provinciaedo__facturacion}
              placeholder={errors.provinciaedo__facturacion && "Obligatorio"}
              id="provinciaedo__facturacion"
              type="text" 
              { ...register("provinciaedo__facturacion", { required: false })}
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