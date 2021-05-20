import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { saveAs } from 'file-saver'
import { Alert } from 'antd';

import { useTiendaState, useTiendaDispatch } from 'context/TiendaContext'
import OCpage from './OCpage'


// import OCpage from './OCpage'
const baseURL = 'https://quiet-castle-61424.herokuapp.com/api/v1'


const InvoiceCart = () => {

  const [ pdfPayload, setPdfPayload ] = useState([])
  
  const dispatch = useTiendaDispatch()
  const state = useTiendaState()
  const { pdfData } = state.context

  const params = useParams()
  const { folio } = params

  
  useEffect(() => {
    dispatch("GET_DATA_TO_INVOICE", { folio })    
  },[])

  useEffect(() => {  
      
      if(state.matches("pdfDataDone")){
        setPdfPayload(pdfData)
      }
    

  },[state.value])


  const pdfCreator = () => {

    fetch(`https://quiet-castle-61424.herokuapp.com/api/v1/pdf?folio=${folio}`, {
      
      headers: {  "Content-Type": "application/json" },
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify(pdfPayload)
    }).then(res => {
      return res
        .arrayBuffer()
        .then(res => {
          const blob = new Blob([res], { type: "applicacion/pdf"})
          saveAs(blob, `ITAMX_${folio}.pdf`)
          dispatch("EMPTY_CART")
          
        })
        .catch(error => console.log(error))
    })
  }

  // console.log(typeof payload, params)
  // TODO: usar OCPAGE para crear vista previa de los datos del documento tipo amazon, no tiene que ser la vista PDF o si? XD
  // TODO añadir al modelo cotizacion 
  
  return(
    
    <div className="mt-3">

      <div className="d-flex justify-content-center mt-3 flex-column text-center">
        { 
          state.matches("pdfDataDone") && (
            <Fragment>
              
            <div>
              <button onClick={pdfCreator} className="invoice-button-send">Descargar PDF</button>
            </div>

            <div> 
              <OCpage data={pdfData} />
            </div>

            </Fragment>
            )
        }
      </div>
      {
        state.matches("emptyCart") && (
        
        <Alert
          message="¡Gracias por su preferencia!"
          description="Pronto un asesor se pondrá en contacto con usted"
          type="info"
          showIcon
        />)
        
      }
      <div className="footer--carrito"></div>

    </div>
  )
}

export default InvoiceCart