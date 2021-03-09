import React from 'react'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router-dom'


const Step3 = (props) => {

    const { register, handleSubmit } = useForm()
    
    const onSubmit = (data) => {
        
        props.send('GO_STEP4', { data })
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Paso 3</h1>
            <p>El caso de contar con el link de la publicación de Amazon o Mercado Libre, favor de copiar el link completo</p>
            
            <strong>Para los links de Mercado Libre</strong>
            <strong><p>Es importante solo poner el número de la publicación, sin el guión</p></strong>

            <strong>Ejemplo:</strong>
            <p>https://articulo.mercadolibre.com.mx/<strong>MLM-580973346</strong>-caja-ip55-220x170x80-ko-abb-1sl0826a00-_JM</p>
            Pega el link así: <strong>MLM580973346</strong>

            <section className="mt-3">
            <legend>ecommerce-link</legend>
            <div id="form--container">

                <label htmlFor="ml">Link Mercado Libre</label>
                <input type="text" id="ml" name="ml" ref={register} />

                <label htmlFor="amazon">Link Amazon</label>
                <input type="text" id="amazon" name="amazon" ref={register} />    

            </div>
            </section>

            <section>
            <section className="mt-2 mb-2 d-flex justify-content-end">
                <button className="btn btn-outline-danger mr-2" type="submit">Siguiente</button>
            </section>
            </section>
        </form>
    )
}

export default withRouter(Step3)