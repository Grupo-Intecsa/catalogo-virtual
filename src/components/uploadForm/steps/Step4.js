import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router-dom'

import ProgressBar from '../ProgressBar'

const Step4 = (props) => {

    const [ error, setError ] = useState()
    const [ file, setFile ] = useState()

    const typesAllow = ['image/webp']
    const handledInput = ( e ) => {

        // como es un imput de varios recibiremos un objecto

        let files = Object.values(e.target.files)
        let arrayImg = []

        console.log(files, arrayImg)

        if(files){
            files.map(( file ) => {
                
                // revisamos si es del tipo permitido 
                
                if(typesAllow.includes(file.type)){
                    arrayImg.push(file)
                    setError("")
                } else {
                    setError('El archivo no es una imagen valida webp')
                }
                // los que si sean se acomodan aqui 
                return setFile(arrayImg)
            })
        }

    }

    const { handleSubmit } = useForm()
    
    const onSubmit = (data) => {
        props.send("GO_FINAL", { data })
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Paso 5</h1>
            <section>
                <legend>Imagenes y PDF</legend>
            <div id="form--container">
                <fieldset>
                    {/* cambiar el handheInput por el boton */}
                        <label for="imagen-input">Imagenes</label>
                        <input id="imagen-input" multiple={true} type="file" onChange={handledInput} />
                        <div className="form-control-file">
                            
                            {file && file.map(file => <div className>{ file.name }</div>)}
                            {file && file.map(file => <ProgressBar file={ file } setFile={ setFile }/>)}
                            {error}
                        </div>
                    </fieldset>
                <fieldset>
                {/* cambiar el handheInput por el boton */}
                    <label for="pdf-input">PDF</label>
                    <input id="pdf-input" multiple={false} type="file" onChange={handledInput} />
                    <div className="form-control-file">
                        
                        {file && file.map(file => <div className>{ file.name }</div>)}
                        {file && file.map(file => <ProgressBar file={ file } setFile={ setFile }/>)}
                        
                        {error}
                    </div>
                
                </fieldset>
            </div>
            </section>

            <section className="mt-2 mb-2 d-flex justify-content-end">
                <button className="btn btn-outline-danger mr-2" type="submit">Siguiente</button>
            </section>
        </form>
    )
}

export default withRouter(Step4)