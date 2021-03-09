import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'

import ProgressBar from '../ProgressBar'


const Step4 = (props) => {

    const [isDone, setIsDone] = useState(false)

    const [ urlDone, setUrlDone ] = useState(null)
    const [ arrrUrl, setArrUrl ] = useState([])

    useEffect(() => {
        setArrUrl(arrrUrl => [...arrrUrl, urlDone ])
    },[urlDone])

    const [ error, setError ] = useState()
    const [ file, setFile ] = useState()

    const typesAllow = ['image/webp']
    const handledInput = ( e ) => {

        let files = Object.values(e.target.files)
        let arrayImg = []

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

    const { handleSubmit, register } = useForm()
    
    const onSubmit = () => {
        const item = {
            urlfoto: arrrUrl.slice(1, arrrUrl.length)
        }
        // vaciamos los elementos para la siguiete vuleta
        props.send("GO_FINAL", { data: item })
        setUrlDone(null)
        setArrUrl([])
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Paso 4</h1>
            <p>Por el momento solo puedes subir images webp, da <strong>Clic en la nube</strong></p>
            <section>
                <legend>Imagenes y PDF</legend>
            <div id="form--container">
                    
                <fieldset className="input-file-container">
                {/* cambiar el handheInput por el boton */}
                <fieldset className="d-flex align-content-center justify-content-center">
                {!isDone &&(
                    <label htmlFor="pdf-input">
                    <FontAwesomeIcon size="7x" icon={faCloudDownloadAlt} className="label-nubecita"/>
                    </label>
                    )}
                <input id="pdf-input" multiple={true} type="file" onChange={handledInput} className="hide" name="urlfoto" ref={register} />
                <div className="form-control-file">
                        
                        {file && file.map(file => <small>{ file.name }</small>)}
                        {file && file.map(file => <ProgressBar file={ file } setFile={ setFile } setIsDone={setIsDone} setUrlDone={setUrlDone} />)}
                        {error && <div>{error}</div>}
                        
                    </div>
                    
                </fieldset>
                    </fieldset>
            </div>
            </section>

            <section className="mt-2 mb-2 d-flex justify-content-end">
                {isDone && <button className="btn btn-outline-danger mr-2" type="submit">Siguiente</button>}
            </section>
        </form>
    )
}

export default withRouter(Step4)