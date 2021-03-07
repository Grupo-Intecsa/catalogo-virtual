import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router-dom'

import { CAlert } from '@coreui/react'


const Step1 = (props) => {

    const [ isModal, setIsModal ] = useState(false)

    const { send } = props

    const { register, handleSubmit } = useForm()
    
    const onSubmit = (data) => {
        setIsModal(true)
        // send('GO_STEP2', { data })
    }

    return(
        <Fragment>

        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Paso 1</h1>
            <p>El código del producto puede ser el modelo o el codigo de AdminPAQ o Comercial</p>
            <section>
                <legend className="text-center">Código del producto</legend>
                <div id="form--container">
                    <label htmlFor="model">Código o Modelo</label>
                    <input 
                        type="text" 
                        id="model" 
                        name="model" 
                        ref={register} 
                        placeholder="Ingresa el código del producto"
                        />
                        
                    <small>*Dato Requerido</small>

                    <hr />

                    {isModal && (
                    <CAlert className="bg-gradient-info">
                        {/*eslint-disable-next-line*/}
                        Verificando código
                        {" "}
                        <div className="spinner-grow" style={{"width": "1rem", "height": "1rem"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </CAlert>
                    )}
                    {
                        isModal && (
                            <CAlert className="bg-gradient-danger">
                                El producto ya está en la base de datos
                            </CAlert>
                        )
                    
                    }

                </div>
            </section>
            <section className="mt-2 mb-2 d-flex justify-content-end">
                <button className="btn btn-outline-danger mr-2" type="submit">Siguiente</button>
            </section>
        </form>

        {/* modales */}
        

    </Fragment>
    )
}

export default withRouter(Step1)