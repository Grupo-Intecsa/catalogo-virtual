import React from 'react'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router-dom'

const Step2 = (props) => {

    const { register, handleSubmit } = useForm()    
    const onSubmit = (data) => {
        props.send('GO_STEP3', { data })
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Paso 2</h1>
            <section>
            <legend>Datos del Producto</legend>
            <div id="form--container">
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
                <label htmlFor="sku">SKU</label>
                <input type="sku" id="sku" name="sku" ref={register} />

                <label htmlFor="brand">Marca</label>
                <input type="text" id="brand" name="brand" ref={register} />

                <label htmlFor="label">Categoria</label>
                <input type="text" id="label" name="label" ref={register} />

                <label htmlFor="desc">Descripción Larga</label>
                <input type="text" id="desc" name="desc" ref={register} />
            </div>
            </section>
            <section className="mt-2 mb-2 d-flex justify-content-end">
                <button className="btn mr-2 btn-outline-danger" type="submit">Siguiente</button>
            </section>
        </form>
    )
}

export default withRouter(Step2)