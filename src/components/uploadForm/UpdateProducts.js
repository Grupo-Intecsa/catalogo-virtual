import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'


const UpdateProductos = ({ userId }) => {
  
  // const [ visible, setVisible ] = useState(false)
  const [ state, send ] = useMachine(CatalogoXstate)
  const [ alert, setAlert ] = useState(false)

  const { queryBrand, update } = state.context
  const { register, handleSubmit, setValue, reset } = useForm()

  const onSubmit = (e) => {
    
    const body = { ml: e.ml, desc: e.desc, title: e.title }

    if(state.value === 'idle'){
      send("GET_PRODUCT_BY_MODEL", { model: e.model })

    }else if(state.value === 'success'){
      send("UPDATE", { body })
    }
    
  }

  const handledReset = () => {
    send('RESET')
    reset()
  }

  const setTUpdateSuccess = () => {
    reset()
    setAlert("Exito al Actualizar Producto")
    setTimeout(() => {
      setAlert("")
    },3000)
  }

  useEffect(() => {

    if(state.matches('success')){
      
      setValue("title", queryBrand[0].title)
      setValue("ml", queryBrand[0].ml)
      setValue("desc", queryBrand[0].desc)

    }else if(state.matches('idle') && update ){
      setTUpdateSuccess()
    }
  },[state.value]) 


  return(
    <div className="update--container">
        <h4 className="p-3 bg-warning">Modifica un Producto</h4>
      <div className="d-flex justify-content-center">
        
      </div>
      
      <p className={ alert ? "alert alert-success" : null } >{alert && alert }</p>

      <p className="font-weight-bold">Agrega el modelo del producto y dale clic en buscar</p>
        
          <form onSubmit={handleSubmit(onSubmit)} className="form--update">

            <input placeholder="Agrega el modelo del producto" name="model" ref={register} />

            <label>Title</label>
            <input name="title" ref={register}></input>
            
            <label>ID Mercado Libre</label>
            <input name="ml" ref={register}></input>
            
            <label>Descripción</label>
            <textarea cols="4" rows="6" name="desc" ref={register}></textarea>
        
            <div className="d-flex justify-content-end">
              <button className="btn-modal-capacidad">{state.matches('idle') ? 'Buscar' : 'Actualizar'}</button>
              <button onClick={handledReset} className="btn-modal-capacidad">Reset</button>
            </div>
        </form>

    </div>
  )
}

export default UpdateProductos