import React from 'react'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router-dom'


const Step1 = (props) => {

    const { send } = props

    const { register, handleSubmit } = useForm()
    
    const onSubmit = (data) => {
        console.log(data, props)
        send('GO_STEP2', { data })
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Paso 1</h1>
            <section>
                <legend className="text-center">Datos del producto</legend>
                <div id="form--container">
                    <label htmlFor="model">Modelo</label>
                    <input 
                        type="text" 
                        id="model" 
                        name="model" 
                        ref={register} 
                        placeholder="Codigo Comercial o AdminPaq"/>
                    <small>*Dato Requerido</small>

                    <label htmlFor="title">Nombre del producto</label>
                    <input 
                        type="text"
                        id="title" 
                        name="title" 
                        ref={register} 
                        placeholder="Nombre corto del producto"
                    />
                    <small>*Dato Requerido</small>

                    <label htmlFor="coduniversal">Codigo EAN</label>
                    <input 
                        type="text" 
                        id="coduniversal" 
                        name="coduniversal" 
                        ref={register}
                        placeholder="Codigo de Barras"
                    />
                </div>
            </section>
            <section className="mt-2 mb-2 d-flex justify-content-end">
                <button className="btn btn-outline-danger mr-2" type="submit">Siguiente</button>
            </section>
        </form>
    )
}

export default withRouter(Step1)