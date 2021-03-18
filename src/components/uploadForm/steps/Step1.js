import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { withRouter, useHistory } from 'react-router-dom'


import { CAlert } from '@coreui/react'

const Step1 = (props) => {

		const history = useHistory()

		console.log(history)

    const { send, state } = props
    const { register, handleSubmit } = useForm()
    
    const onSubmit = (data) => {
				send('VERIFY', { id: data })
				
    }

		const { isValid, isError } = state.context


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
				
							<small className="mt-2">*Dato Requerido</small>

							<hr />

							{state.matches('findByModel') && (
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
									isValid && (
											<CAlert className="bg-gradient-danger">
													El producto ya está en la base de datos
											</CAlert>
									)
							
							}
							{
									isError && (
											<CAlert className="bg-gradient-danger">
													El campo no puede estar vacio o contener menos de 4 carácteres
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