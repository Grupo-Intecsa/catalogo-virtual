import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Spin } from 'antd';
import { useForm } from 'react-hook-form'
import { useMachine } from '@xstate/react'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CProgress } from '@coreui/react'
import useStorage from 'FirebaseHook/useStorage'

import { CatalogoXstate } from 'context/CatalogoXstate'


// TODO enviar datos base de datos
// TODO enviar datos a mondday

const UploadForm = ({ file, setUrlValid }) => {

  const {  progress, url } = useStorage(file)

  if(url.length > 5){
    setUrlValid(url)
  }

  return progress === 0 ? <span>{file?.name}</span> : <CProgress animated color="info" value={progress} />

}

const FormContact = ({ visible, contactoToggle, title }) => {

    
    const [ state, send ] = useMachine(CatalogoXstate)

    
    const phone = "5215546371510"
    const whatsappMessage = `https://api.whatsapp.com/send/?phone=${phone}&text=Me gustaria tener información del producto: ${title}`

    const { register, handleSubmit, reset  } = useForm()

    const handleCancel = () => {  
      reset()
      contactoToggle()
    }
    
    const [ loading, setLoading ] = useState(false)
    
    const [ fileUpload, setFileUpload ] = useState(undefined)
    const [ urlValid, setUrlValid ] = useState(undefined)

    const handleFileUpload = (data) => {
      
      let file = Object.values(data.target.files)
      setFileUpload(file)
    }
    

    const submitForm = (data) => {
      if(typeof fileUpload !== 'undefined'){
            
        if (typeof urlValid !== 'undefined') {
          send('SEND_TO_MONDAY', { data: { ...data, urlValid } })
        }
        // send('SEND_TO_MONDAY', { data: { ...data, urlValid } })
      
      }else if(typeof fileUpload === 'undefined' && typeof urlValid === 'undefined' ){
        send('SEND_TO_MONDAY', { data })
      }
      // send('SEND_TO_MONDAY', { data })
      console.log(data.document)

    }

  
    useEffect(() => {
      // efecto de loading y cierra el modal al terminar la carga
        if(state.matches("sendToMonday")){
          setLoading(true)
        }

        if(state.matches('success')){
          window.open(whatsappMessage, '_blank');
          setLoading(false)
          handleCancel()
        }  

    },[state.matches])


  return(
    <Fragment>

    <Modal 
        
        visible={visible}
        title="Contacto Grupo Intecsa"
        onOk={submitForm}
        style={{ top: 0 }}
        onCancel={handleCancel}
        footer={null}
      >
      
        <span>Ayudanos llenando el siguiente formulario para inciar el chat por whataspp con un asesor</span>
      

        <form onSubmit={handleSubmit(submitForm)} className="form--contacto">

            <label htmlFor="name">Nombre completo</label>
            <input id="name" name="name" type="text" ref={register} required={true} />

            <label htmlFor="phone">Télefono</label>
            <input id="phone" name="phone" type="text" ref={register} required={true} />

            <label htmlFor="subject">Asunto</label>
            <select defaultValue="INFO MATERIAL" id="subject" name="subject" type="text" ref={register}  >
                <option value="COTIZACION DE PROYECTO">Cotización de proyecto</option>
                <option value="INFO MATERIAL">Información de material</option>
                <option value="INSTALACIONES ELECTRICAS">Instalaciones eléctricas</option>
                <option value="QUEJAS O SUGERENCIAS">Quejas o sugerencias</option>
                <option value="SERVICIOS">Servicios</option>
                <option value="PROVEEDORES">Proveedores</option>
                <option value="SOPORTE TECNICO">Soporte técnico</option>
                <option value="RR.HH">Recursos Humanos</option>
                <option value="OTRO">Otro</option>
            </select>

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" ref={register} required={true} />  

            <label htmlFor="coment">Comentario</label>          
            <textarea rows={4} cols={4} id="coment" ref={register} name="coment" defaultValue={title} />

            <p>¿Tienes un proyecto?, adunta una lista o datos de tu proyecto</p>
            <input type="file" id="document" name="document" ref={register} hidden onChange={handleFileUpload} />
            <label htmlFor="document"><span><FontAwesomeIcon icon={faPaperclip} size="2x" /></span></label>
            { fileUpload && fileUpload.map(file => <UploadForm file={file} setUrlValid={setUrlValid} className="mb-2" />)}
            
          <div className="form--submit mt-1">

            <button key="submit" type="submit">
              { loading && <Spin /> }
              Enviar
            </button>
          
          </div>

        </form>

    </Modal>

    </Fragment>
    
  )
}


export default FormContact