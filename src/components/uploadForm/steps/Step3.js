import React from 'react'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router-dom'


const Step3 = (props) => {

    const { register, handleSubmit } = useForm()
    
    const onSubmit = (data) => {
        props.send('GO_STEP3', { data })
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Paso 3</h1>
            <section>
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